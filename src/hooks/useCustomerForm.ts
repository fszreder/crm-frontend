import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { getCustomerById, createCustomer, updateCustomer } from '@/lib/customerService';
import type { Client } from '@/types/client';

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    countryCode: string;
    rawPhone: string;
    street: string;
    city: string;
    zip: string;
    notes: string;
};

type FormErrors = {
    firstName: string;
    lastName: string;
    email: string;
    rawPhone: string;
};

const initialForm: FormData = {
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+48',
    rawPhone: '',
    street: '',
    city: '',
    zip: '',
    notes: '',
};

const initialErrors: FormErrors = {
    firstName: '',
    lastName: '',
    email: '',
    rawPhone: '',
};

export const useCustomerForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const isEditing = Boolean(id);

    const [formData, setFormData] = useState<FormData>(initialForm);
    const [formErrors, setFormErrors] = useState<FormErrors>(initialErrors);
    const [loading, setLoading] = useState(false);

    const fetchCustomer = useCallback(async () => {
        if (!id) return;

        try {
            setLoading(true);
            const client: Client = await getCustomerById(id);

            if (!client || typeof client !== 'object') {
                throw new Error('Zły format danych');
            }

            const code = client.phone.slice(0, 3);
            const raw = client.phone.slice(3);

            setFormData({
                firstName: client.firstName ?? '',
                lastName: client.lastName ?? '',
                email: client.email ?? '',
                countryCode: code || '+48',
                rawPhone: raw || '',
                street: client.address?.street ?? '',
                city: client.address?.city ?? '',
                zip: client.address?.zip ?? '',
                notes: client.notes ?? '',
            });
        } catch {
            toast.error('Nie udało się pobrać klienta');
            navigate('/clientList');
        } finally {
            setLoading(false);
        }
    }, [id, navigate]);

    useEffect(() => {
        fetchCustomer();
    }, [fetchCustomer]);

    const validateField = (name: keyof FormErrors, value: string) => {
        switch (name) {
            case 'firstName':
            case 'lastName':
                return value.trim().length >= 2 ? '' : 'Imię i nazwisko muszą mieć min. 2 znaki.';
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
                    ? ''
                    : 'Nieprawidłowy e-mail.';
            case 'rawPhone':
                return /^\d{6,15}$/.test(value.trim()) ? '' : 'Nieprawidłowy numer telefonu.';
            default:
                return '';
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name in formErrors) {
            setFormErrors((prev) => ({
                ...prev,
                [name]: validateField(name as keyof FormErrors, value),
            }));
        }
    };

    const validateForm = () => {
        const newErrors: FormErrors = {
            firstName: validateField('firstName', formData.firstName),
            lastName: validateField('lastName', formData.lastName),
            email: validateField('email', formData.email),
            rawPhone: validateField('rawPhone', formData.rawPhone),
        };

        setFormErrors(newErrors);
        return Object.values(newErrors).every((err) => !err);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Popraw błędy w formularzu');
            return;
        }

        const fullPhone = `${formData.countryCode}${formData.rawPhone.trim()}`;

        const newClient = {
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            email: formData.email.trim(),
            phone: fullPhone,
            address: {
                street: formData.street,
                city: formData.city,
                zip: formData.zip,
            },
            notes: formData.notes,
        };

        try {
            setLoading(true);

            if (isEditing && id) {
                await updateCustomer(id, newClient);
                toast.success('Klient zaktualizowany');
            } else {
                await createCustomer(newClient);
                toast.success('Klient dodany');
            }

            const from = location.state?.from;
            navigate(from === 'homepage' ? '/homepage' : '/clientList');
        } catch (err) {
            toast.error('Błąd zapisu klienta');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        const from = location.state?.from;
        navigate(from === 'homepage' ? '/homepage' : '/clientList');
    };

    return {
        formData,
        formErrors,
        isEditing,
        loading,
        handleChange,
        handleSubmit,
        handleCancel,
    };
};
