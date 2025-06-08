import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Service } from '@/types/service';
import { toast } from 'sonner';

interface Props {
    clientId: number;
    onAdd: (service: Service) => void;
    nextId: number;
    onClose: () => void;
}

export const AddServiceDialog = ({ onAdd, onClose }: Props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [vehicleModel, setVehicleModel] = useState('');

    const [formErrors, setFormErrors] = useState({
        name: '',
        description: '',
        price: '',
        vehicleModel: '',
    });

    const validateField = (field: string, value: string): string => {
        switch (field) {
            case 'name':
            case 'description':
            case 'vehicleModel':
                return value.trim() === '' ? 'To pole jest wymagane' : '';
            case 'price':
                return /^\d+(\.\d{1,2})?$/.test(value.trim())
                    ? ''
                    : 'Podaj poprawną cenę (np. 199.99)';
            default:
                return '';
        }
    };

    const handleBlur = (field: string, value: string) => {
        setFormErrors((prev) => ({
            ...prev,
            [field]: validateField(field, value),
        }));
    };

    const handleSubmit = () => {
        const errors = {
            name: validateField('name', name),
            description: validateField('description', description),
            price: validateField('price', price),
            vehicleModel: validateField('vehicleModel', vehicleModel),
        };

        setFormErrors(errors);

        const hasErrors = Object.values(errors).some((error) => error !== '');
        if (hasErrors) {
            toast.error('Uzupełnij wszystkie pola poprawnie');
            return;
        }

        const newService: Service = {
            name,
            price: parseFloat(price),
            vehicleModel,
            date: new Date().toISOString(),
        };

        onAdd(newService);
        toast.success('Usługa została dodana');
        onClose();
    };

    return (
        <Dialog open onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="bg-white text-black rounded-lg">
                <DialogHeader>
                    <DialogTitle>Dodaj wykonaną usługę</DialogTitle>
                </DialogHeader>

                <form
                    className="space-y-2"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <Input
                        placeholder="Nazwa usługi"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={(e) => handleBlur('name', e.target.value)}
                        className={formErrors.name ? 'border-red-500' : ''}
                    />
                    {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}

                    <Input
                        placeholder="Opis"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onBlur={(e) => handleBlur('description', e.target.value)}
                        className={formErrors.description ? 'border-red-500' : ''}
                    />
                    {formErrors.description && (
                        <p className="text-red-500 text-sm">{formErrors.description}</p>
                    )}

                    <Input
                        placeholder="Cena"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        onBlur={(e) => handleBlur('price', e.target.value)}
                        className={formErrors.price ? 'border-red-500' : ''}
                    />
                    {formErrors.price && <p className="text-red-500 text-sm">{formErrors.price}</p>}

                    <Input
                        placeholder="Model pojazdu"
                        value={vehicleModel}
                        onChange={(e) => setVehicleModel(e.target.value)}
                        onBlur={(e) => handleBlur('vehicleModel', e.target.value)}
                        className={formErrors.vehicleModel ? 'border-red-500' : ''}
                    />
                    {formErrors.vehicleModel && (
                        <p className="text-red-500 text-sm">{formErrors.vehicleModel}</p>
                    )}
                    <button type="submit" hidden />
                </form>

                <DialogFooter className="pt-4">
                    <Button
                        type="button"
                        onClick={onClose}
                        variant="outline"
                        className="hover:bg-gray-600 hover:text-white"
                    >
                        Anuluj
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="outline"
                        className="hover:bg-blue-600 hover:text-white"
                    >
                        Zapisz
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
