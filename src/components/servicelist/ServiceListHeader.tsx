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

interface Props {
    onAdd: (service: Service) => void;
    nextId: number;
}

export const ServiceListHeader = ({ onAdd, nextId }: Props) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleAddService = () => {
        if (!name || !description || !price) {
            toast.error('Wszystkie pola są wymagane');
            return;
        }

        const newService: Service = {
            id: nextId,
            name,
            description,
            price,
        };

        onAdd(newService);
        toast.success(`Dodano usługę "${name}"`);
        setName('');
        setDescription('');
        setPrice('');
        setOpen(false); // <- zamknij okno
    };

    return (
        <div className="flex justify-between items-center mb-4">
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
                <DialogContent className="fixed z-50 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <DialogHeader>
                        <DialogTitle>Dodaj nową usługę</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Nazwa usługi</Label>
                            <Input value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>Opis</Label>
                            <Input
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Cena</Label>
                            <Input value={price} onChange={(e) => setPrice(e.target.value)} />
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
    );
};
