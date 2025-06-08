import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { getCustomerById, createCustomer, updateCustomer } from '@/lib/customerService';

export const useCustomerForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const isEditing = Boolean(id);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '+48',
        rawPhone: '',
        street: '',
        city: '',
        zip: '',
        notes: '',
    });

    const [formErrors, setFormErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        rawPhone: '',
    });

    useEffect(() => {
        if (id) {
            getCustomerById(id).then((client) => {
                if (client) {
                    const code = client.phone.slice(0, 3);
                    const raw = client.phone.slice(3);

                    setFormData({
                        firstName: client.firstName,
                        lastName: client.lastName,
                        email: client.email,
                        countryCode: code,
                        rawPhone: raw,
                        street: client.address.street,
                        city: client.address.city,
                        zip: client.address.zip,
                        notes: client.notes,
                    });
                }
            });
        }
    }, [id]);

    const validateField = (name: string, value: string) => {
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
        setFormData({ ...formData, [name]: value });

        if (name in formErrors) {
            setFormErrors({ ...formErrors, [name]: validateField(name, value) });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

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
        }
    };

    const handleCancel = () => {
        const from = location.state?.from;
        navigate(from === 'homepage' ? '/homepage' : '/clientList');
    };

    return {
        formData,
        isEditing,
        handleChange,
        handleSubmit,
        handleCancel,
    };
};
