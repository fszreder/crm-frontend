import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import type { Client } from '@/data/mockClients';
import { CountryCodeCombobox } from '@/components/homepage/CountryCodeCombobox';
import { Plus } from 'lucide-react';

interface AddClientDialogProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    onClientAdd: (client: Client) => void;
}

export const AddClientDialog = ({ isOpen, setIsOpen, onClientAdd }: AddClientDialogProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [countryCode, setCountryCode] = useState('+48');
    const [rawPhone, setRawPhone] = useState('');

    const handleSubmit = () => {
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedPhone = rawPhone.trim();
        const fullPhone = `${countryCode}${trimmedPhone}`;

        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
        const isPhoneValid = /^\d{6,15}$/.test(trimmedPhone);
        const isNameValid = trimmedName.length >= 3;

        if (!isNameValid) {
            alert('Imię i nazwisko musi mieć co najmniej 3 znaki.');
            return;
        }

        if (!trimmedName || !trimmedEmail) {
            alert('Imię i e-mail są wymagane.');
            return;
        }

        if (!isEmailValid) {
            alert('Podaj poprawny adres e-mail.');
            return;
        }

        if (trimmedName.length > 50 || trimmedEmail.length > 50 || trimmedPhone.length > 50) {
            alert('Maksymalna długość pola to 50 znaków.');
            return;
        }
        if (!trimmedPhone) {
            alert('Numer telefonu jest wymagany.');
            return;
        }
        if (!isPhoneValid) {
            alert(
                "Numer telefonu musi zaczynać się od '+' i zawierać tylko cyfry (np. +48123456789)."
            );
            return;
        }

        const newClient: Client = {
            id: Math.floor(Math.random() * 1000000),
            name: trimmedName,
            email: trimmedEmail,
            phone: fullPhone,
            createdAt: new Date().toISOString().split('T')[0],
            address: '',
            notes: '',
        };

        onClientAdd(newClient);
        setName('');
        setName('');
        setEmail('');
        setRawPhone('');
        setIsOpen(false);
    };
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="hover:bg-gray-600 hover:text-white cursor-pointer transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Dodaj klienta
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white p-6 rounded-xl shadow-xl">
                <DialogHeader>
                    <DialogTitle>Dodaj nowego klienta</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Imię i nazwisko
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            maxLength={50}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            maxLength={50}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">
                            Telefon
                        </Label>
                        <div className="col-span-3 flex gap-2">
                            <CountryCodeCombobox value={countryCode} onChange={setCountryCode} />
                            <Input
                                id="phone"
                                placeholder="123456789"
                                value={rawPhone}
                                onChange={(e) => setRawPhone(e.target.value)}
                                maxLength={15}
                                className="flex-1"
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit}>Zapisz</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
