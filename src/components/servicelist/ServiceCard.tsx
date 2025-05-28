import type { Service } from '@/types/service';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Eye } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

interface ServiceCardProps {
    service: Service;
    onDelete: (id: number) => void;
    onDetails: (id: number) => void;
}

export const ServiceCard = ({ service, onDelete, onDetails }: ServiceCardProps) => {
    const handleConfirmDelete = () => {
        onDelete(service.id);
        toast(`Usunięto usługę: "${service.name}" została usunięta.`);
    };

    return (
        <Card>
            <CardContent className="p-4 flex justify-between items-center">
                <div>
                    <div className="font-semibold text-lg">{service.name}</div>
                    <div className="text-sm text-gray-500">{service.description}</div>
                    <div className="text-sm text-gray-500">{service.price}</div>
                </div>
                <div className="flex gap-2">
                    <Button
                        className="hover:bg-gray-600 hover:text-white cursor-pointer transition-colors flex items-center gap-2"
                        variant="outline"
                        size="icon"
                        onClick={() => onDetails(service.id)}
                        title="Szczegóły"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                className="hover:bg-red-600 bg-red-500 hover:text-white cursor-pointer transition-colors flex items-center gap-2"
                                variant="destructive"
                                size="icon"
                                title="Usuń"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Na pewno usunąć?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Usługa "{service.name}" zostanie bezpowrotnie usunięta.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Anuluj</AlertDialogCancel>
                                <AlertDialogAction onClick={handleConfirmDelete}>
                                    Usuń
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardContent>
        </Card>
    );
};
