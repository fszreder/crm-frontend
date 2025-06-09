import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Client } from '@/types/client';

import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';

interface ClientCardProps {
    client: Client;
    onDetails: (id: string) => void;
    onDelete: (id: string) => void;
    onAddService: (id: string) => void;
}

export const ClientCard = ({ client, onDetails, onDelete, onAddService }: ClientCardProps) => {
    const clientServices = [...client.services].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const lastService = clientServices[0];

    return (
        <Card className="transition-colors duration-300 hover:bg-gray-100">
            <CardContent className="p-4 flex flex-col sm:flex-row sm:justify-between gap-4">
                <div className="min-w-0 break-words w-full">
                    <div className="font-semibold text-lg">
                        {client.firstName} {client.lastName}
                    </div>
                    <div className="text-sm text-gray-500">{client.email}</div>
                    <div className="text-sm text-gray-500">{client.phone}</div>
                    <div className="text-sm text-gray-500">
                        {client.address.street}, {client.address.zip} {client.address.city}
                    </div>
                    <div className="text-sm text-gray-500">{client.notes}</div>

                    {lastService && (
                        <div className="text-sm text-gray-600 mt-2">
                            <strong>Ostatnia usługa:</strong> {lastService.name} (
                            {lastService.vehicleModel}) – {lastService.price} zł
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-2 w-full sm:w-auto">
                    <Button
                        className="w-full hover:bg-gray-600 hover:text-white cursor-pointer transition-colors"
                        variant="outline"
                        onClick={() => onDetails(client._id)}
                    >
                        Szczegóły
                    </Button>

                    <Button
                        className="w-full hover:bg-blue-600 hover:text-white cursor-pointer transition-colors"
                        variant="outline"
                        onClick={() => onAddService(client._id)}
                    >
                        ➕ Dodaj usługę
                    </Button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="destructive"
                                className="w-full cursor-pointer bg-red-500 text-white hover:bg-red-600 flex items-center gap-2"
                            >
                                <Trash2 size={16} />
                                Usuń
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white">
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Czy na pewno chcesz usunąć tego klienta?
                                </AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="w-full hover:bg-gray-600 hover:text-white transition-colors cursor-pointer">
                                    Anuluj
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    className="w-full bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer"
                                    onClick={() => onDelete(client._id)}
                                >
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
