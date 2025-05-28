import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Client } from '@/data/mockClients';
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
    onDetails: (id: number) => void;
    onDelete: (id: number) => void;
}

export const ClientCard = ({ client, onDetails, onDelete }: ClientCardProps) => (
    <Card className="transition-colors duration-300 hover:bg-gray-100">
        <CardContent className="p-4 flex justify-between items-center">
            <div>
                <div className="font-semibold text-lg">{client.name}</div>
                <div className="text-sm text-gray-500">{client.email}</div>
                <div className="text-sm text-gray-500">{client.phone}</div>
                <div className="text-sm text-gray-500">{client.address}</div>
                <div className="text-sm text-gray-500">{client.notes}</div>
            </div>
            <div className="flex gap-2">
                <Button
                    className="hover:bg-gray-600 hover:text-white cursor-pointer transition-colors flex items-center gap-2"
                    variant="outline"
                    onClick={() => onDetails(client.id)}
                >
                    Szczegóły
                </Button>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="destructive"
                            className="cursor-pointer bg-red-500 text-white hover:bg-red-600 flex items-center gap-2"
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
                            <AlertDialogCancel className="hover:bg-gray-600 hover:text-white transition-colors cursor-pointer">
                                Anuluj
                            </AlertDialogCancel>
                            <AlertDialogAction
                                className="bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer"
                                onClick={() => onDelete(client.id)}
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
