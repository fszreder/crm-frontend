import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mockClients } from '@/data/mockClients';
import { toast } from 'sonner';

export const useCustomerForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        countryCode: '+48',
        rawPhone: '',
        address: '',
        notes: '',
    });
    const [formErrors, setFormErrors] = useState({
        name: '',
        email: '',
        rawPhone: '',
    });

    const isEditing = Boolean(id);

    useEffect(() => {
        if (id) {
            const client = mockClients.find((c) => c.id.toString() === id);
            if (client) {
                const countryCode = client.phone.slice(0, 3);
                const rawPhone = client.phone.slice(3);

                setFormData({
                    name: client.name,
                    email: client.email,
                    countryCode,
                    rawPhone,
                    address: client.address,
                    notes: client.notes,
                });
            }
        }
    }, [id]);

    const validateField = (name: string, value: string) => {
        switch (name) {
            case 'name':
                return value.trim().length >= 3 ? '' : 'Imię musi mieć co najmniej 3 znaki.';
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedName = formData.name.trim();
        const trimmedEmail = formData.email.trim();
        const trimmedPhone = formData.rawPhone.trim();
        const fullPhone = `${formData.countryCode}${trimmedPhone}`;

        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
        const isPhoneValid = /^\d{6,15}$/.test(trimmedPhone);
        const isNameValid = trimmedName.length >= 3;

        if (!isNameValid) {
            toast.error('Imię i nazwisko musi mieć co najmniej 3 znaki.');
            return;
        }
        if (!isEmailValid) {
            toast.error('Podaj poprawny adres e-mail.');
            return;
        }

        if (!isPhoneValid) {
            toast.error('Numer telefonu musi zawierać od 6 do 15 cyfr.');
            return;
        }

        const newClient = {
            id: id ? Number(id) : Date.now(),
            name: trimmedName,
            email: trimmedEmail,
            phone: fullPhone,
            address: formData.address,
            notes: formData.notes,
            createdAt: id
                ? (mockClients.find((c) => c.id.toString() === id)?.createdAt ??
                  new Date().toISOString().split('T')[0])
                : new Date().toISOString().split('T')[0],
        };

        if (id) {
            const index = mockClients.findIndex((c) => c.id.toString() === id);
            if (index !== -1) {
                mockClients[index] = newClient;
                console.log('✅ Zaktualizowano klienta:', newClient);
            }
        } else {
            mockClients.push(newClient);
            console.log('✅ Dodano klienta:', newClient);
        }

        navigate('/clientList');
        if (id) {
            const index = mockClients.findIndex((c) => c.id.toString() === id);
            if (index !== -1) {
                mockClients[index] = newClient;
                toast.success('Klient zaktualizowany');
            }
        } else {
            mockClients.push(newClient);
            toast.success('Klient dodany');
        }
    };

    const handleCancel = () => {
        navigate('/clientList');
    };

    return {
        formData,
        isEditing,
        handleChange,
        handleSubmit,
        handleCancel,
    };
};
