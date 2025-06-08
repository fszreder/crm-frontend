import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CustomerInfoCard } from '@/components/customerdetail/CustomerInfoCard';
import { useClientDetail } from '@/hooks/useClientDetail';
import { Pencil, ArrowLeft, Trash2 } from 'lucide-react';
import { addServiceToClient } from '@/lib/customerService';
import type { Service } from '@/types/service';
import { AddServiceDialog } from '@/components/clientlist/AddServiceDialog';

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

const CustomerDetail = () => {
    const { client, handleDelete, handleEdit, handleBack } = useClientDetail();
    const [showDialog, setShowDialog] = useState(false);
    const [localClient, setLocalClient] = useState(client);

    useEffect(() => {
        if (client) {
            setLocalClient(client);
        }
    }, [client]);

    const handleAddService = async (service: Service) => {
        if (!localClient) return;
        try {
            const updatedClient = await addServiceToClient(localClient._id, service);
            setLocalClient(updatedClient);
            setShowDialog(false);
        } catch (err) {
            console.error('Błąd podczas dodawania usługi', err);
        }
    };

    if (!localClient) {
        return <p className="p-6 text-red-600">Nie znaleziono klienta.</p>;
    }

    return (
        <div className="p-6 space-y-6">
            <CustomerInfoCard client={localClient} />

            <div className="flex gap-2 flex-wrap">
                <Button
                    className="hover:bg-gray-600 cursor-pointer hover:text-white transition-colors flex items-center gap-2"
                    onClick={handleBack}
                    variant="outline"
                >
                    <ArrowLeft size={16} />
                    Wróć do listy
                </Button>
                <Button
                    className="hover:bg-gray-600 cursor-pointer hover:text-white transition-colors flex items-center gap-2"
                    onClick={handleEdit}
                    variant="outline"
                >
                    <Pencil size={16} />
                    Edytuj klienta
                </Button>

                <Button
                    onClick={() => setShowDialog(true)}
                    variant="outline"
                    className="hover:bg-blue-600 cursor-pointer hover:text-white transition-colors flex items-center gap-2"
                >
                    ➕ Dodaj usługę
                </Button>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="destructive"
                            className="hover:bg-red-600 cursor-pointer bg-red-500 text-white flex items-center gap-2"
                        >
                            <Trash2 size={16} />
                            Usuń klienta
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Czy na pewno chcesz usunąć tego klienta?
                            </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Anuluj</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDelete}
                                className="bg-red-500 text-white hover:bg-red-600"
                            >
                                Usuń
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

            {localClient.services.length > 0 && (
                <div>
                    <h2 className="text-xl font-bold mb-2">Historia usług</h2>
                    <ul className="space-y-2">
                        {localClient.services.map((service, index) => (
                            <li key={index} className="border rounded-md p-3 shadow-sm">
                                <strong>{service.name}</strong> – {service.vehicleModel} –{' '}
                                {service.price} zł
                                {service.date && (
                                    <div className="text-sm text-gray-500">
                                        Data: {new Date(service.date).toLocaleDateString()}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {showDialog && (
                <AddServiceDialog
                    clientId={Number(localClient._id)}
                    nextId={
                        localClient.services && localClient.services.length > 0
                            ? localClient.services.length + 1
                            : 1
                    }
                    onAdd={handleAddService}
                    onClose={() => setShowDialog(false)}
                />
            )}
        </div>
    );
};

export default CustomerDetail;
