import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CountryCodeCombobox } from '@/components/homepage/CountryCodeCombobox';
import { cn } from '@/lib/utils';

interface Props {
    formData: {
        name: string;
        email: string;
        countryCode: string;
        rawPhone: string;
        address: string;
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
        name: '',
        email: '',
        rawPhone: '',
    });

    const validateField = (name: string, value: string): string => {
        switch (name) {
            case 'name':
                return value.trim().length >= 3 ? '' : 'Imię musi mieć co najmniej 3 znaki.';
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
        const nameError = validateField('name', formData.name);
        const emailError = validateField('email', formData.email);
        const phoneError = validateField('rawPhone', formData.rawPhone);

        setFormErrors({
            name: nameError,
            email: emailError,
            rawPhone: phoneError,
        });

        return !nameError && !emailError && !phoneError;
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
            <button type="submit" className="hidden" aria-hidden="true" />
            <div>
                <input
                    type="text"
                    name="name"
                    placeholder="Imię i nazwisko"
                    value={formData.name}
                    onChange={onChange}
                    onBlur={handleBlur}
                    className={cn('w-full border p-2', formErrors.name && 'border-red-500')}
                />
                {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
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

            <input
                className="w-full border p-2"
                type="text"
                name="address"
                placeholder="Adres"
                value={formData.address}
                onChange={onChange}
            />
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
