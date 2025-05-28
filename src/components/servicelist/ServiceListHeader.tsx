import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import type { Service } from '@/types/service';
import { useNavigate } from 'react-router-dom';

interface Props {
    onAdd: (service: Service) => void;
    nextId: number;
}

export const ServiceListHeader = ({ onAdd, nextId }: Props) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [wasSubmitted, setWasSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleAddService = () => {
        setWasSubmitted(true); // <—

        if (!name || !description || !price) {
            toast.error('Wszystkie pola są wymagane');
            return;
        }

        onAdd({
            id: nextId,
            name,
            description,
            price,
        });

        toast.success(`Dodano usługę "${name}"`);
        setName('');
        setDescription('');
        setPrice('');
        setWasSubmitted(false); // resetuj po sukcesie
        setOpen(false);
    };

    return (
        <div className="flex flex-col gap-2 mb-4">
            <Button
                variant="outline"
                onClick={() => navigate('/homepage')}
                className="cursor-pointer self-start text-sm text-gray-600 hover:text-black transition-colors"
            >
                ← Wróć na dashboard
            </Button>

            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Lista usług</h1>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button
                            variant="outline"
                            className="hover:bg-gray-600 hover:text-white cursor-pointer transition-colors flex items-center gap-2"
                        >
                            Dodaj usługę
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white p-6 rounded-lg shadow-lg z-50">
                        <DialogHeader>
                            <DialogTitle>Dodaj nową usługę</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Nazwa usługi</Label>
                                <Input value={name} onChange={(e) => setName(e.target.value)} />
                                {wasSubmitted && !name && (
                                    <span className="text-red-500 text-sm">
                                        To pole nie może być puste
                                    </span>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label>Opis</Label>
                                <Input
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                {wasSubmitted && !description && (
                                    <span className="text-red-500 text-sm">
                                        To pole nie może być puste
                                    </span>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label>Cena</Label>
                                <Input value={price} onChange={(e) => setPrice(e.target.value)} />
                                {wasSubmitted && !price && (
                                    <span className="text-red-500 text-sm">
                                        To pole nie może być puste
                                    </span>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                className="hover:bg-gray-600 hover:text-white cursor-pointer transition-colors flex items-center gap-2"
                                onClick={handleAddService}
                            >
                                Dodaj
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};
