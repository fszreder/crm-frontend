import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CountryCodeCombobox } from '@/components/homepage/CountryCodeCombobox';
import { cn } from '@/lib/utils';

interface Props {
    formData: {
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
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
    isEditing: boolean;
}

export const CustomerFormFields = ({
    formData,
    onChange,
    onSubmit,
    onCancel,
    isEditing,
}: Props) => {
    const [formErrors, setFormErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        rawPhone: '',
    });

    const validateField = (name: string, value: string): string => {
        switch (name) {
            case 'firstName':
            case 'lastName':
                return value.trim().length >= 2 ? '' : 'Musi mieć co najmniej 2 znaki.';
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
                    ? ''
                    : 'Nieprawidłowy e-mail.';
            case 'rawPhone':
                return /^\d{6,15}$/.test(value) ? '' : 'Nieprawidłowy numer telefonu.';
            default:
                return '';
        }
    };

    const validateAll = (): boolean => {
        const errors = {
            firstName: validateField('firstName', formData.firstName),
            lastName: validateField('lastName', formData.lastName),
            email: validateField('email', formData.email),
            rawPhone: validateField('rawPhone', formData.rawPhone),
        };
        setFormErrors(errors);
        return !errors.firstName && !errors.lastName && !errors.email && !errors.rawPhone;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateAll()) {
            onSubmit(e);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name in formErrors) {
            setFormErrors((prev) => ({
                ...prev,
                [name]: validateField(name, value),
            }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Imię"
                        value={formData.firstName}
                        onChange={onChange}
                        onBlur={handleBlur}
                        className={cn(
                            'w-full border p-2',
                            formErrors.firstName && 'border-red-500'
                        )}
                    />
                    {formErrors.firstName && (
                        <p className="text-red-500 text-sm">{formErrors.firstName}</p>
                    )}
                </div>

                <div>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Nazwisko"
                        value={formData.lastName}
                        onChange={onChange}
                        onBlur={handleBlur}
                        className={cn('w-full border p-2', formErrors.lastName && 'border-red-500')}
                    />
                    {formErrors.lastName && (
                        <p className="text-red-500 text-sm">{formErrors.lastName}</p>
                    )}
                </div>
            </div>

            <div>
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={onChange}
                    onBlur={handleBlur}
                    className={cn('w-full border p-2', formErrors.email && 'border-red-500')}
                />
                {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
            </div>

            <div className="flex gap-2">
                <CountryCodeCombobox
                    value={formData.countryCode}
                    onChange={(code) =>
                        onChange({
                            target: { name: 'countryCode', value: code },
                        } as React.ChangeEvent<HTMLInputElement>)
                    }
                />
                <div className="w-full">
                    <input
                        type="text"
                        name="rawPhone"
                        placeholder="123456789"
                        value={formData.rawPhone}
                        onChange={(e) => {
                            const noSpaces = e.target.value.replace(/\s/g, '');
                            onChange({
                                ...e,
                                target: {
                                    ...e.target,
                                    value: noSpaces,
                                    name: 'rawPhone',
                                },
                            });
                        }}
                        onBlur={handleBlur}
                        className={cn('w-full border p-2', formErrors.rawPhone && 'border-red-500')}
                    />
                    {formErrors.rawPhone && (
                        <p className="text-red-500 text-sm">{formErrors.rawPhone}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                    className="w-full border p-2"
                    type="text"
                    name="street"
                    placeholder="Ulica"
                    value={formData.street}
                    onChange={onChange}
                />
                <input
                    className="w-full border p-2"
                    type="text"
                    name="zip"
                    placeholder="Kod pocztowy"
                    value={formData.zip}
                    onChange={onChange}
                />
                <input
                    className="w-full border p-2"
                    type="text"
                    name="city"
                    placeholder="Miasto"
                    value={formData.city}
                    onChange={onChange}
                />
            </div>

            <textarea
                className="w-full border p-2"
                name="notes"
                placeholder="Notatki"
                rows={3}
                value={formData.notes}
                onChange={onChange}
            ></textarea>

            <div className="flex justify-between">
                <Button
                    variant="outline"
                    type="submit"
                    className="hover:bg-blue-600 cursor-pointer hover:text-white transition-colors"
                >
                    {isEditing ? 'Zapisz zmiany' : 'Dodaj klienta'}
                </Button>
                <Button
                    variant="outline"
                    type="button"
                    onClick={onCancel}
                    className="hover:bg-gray-600 cursor-pointer hover:text-white transition-colors"
                >
                    Anuluj
                </Button>
            </div>
        </form>
    );
};
