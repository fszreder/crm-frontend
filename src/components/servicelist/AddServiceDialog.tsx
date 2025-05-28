import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';
import type { Service } from '@/types/service';

interface Props {
    onAdd: (service: Service) => void;
    nextId: number;
}

export const AddServiceDialog = ({ onAdd, nextId }: Props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = () => {
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
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Dodaj usługę</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Dodaj nową usługę</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label>Nazwa usługi</Label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <Label>Opis</Label>
                        <Input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>Cena</Label>
                        <Input value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit}>Dodaj</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
