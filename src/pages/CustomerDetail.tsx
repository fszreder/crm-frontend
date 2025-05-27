import { Button } from '@/components/ui/button';
import { CustomerInfoCard } from '@/components/customerdetail/CustomerInfoCard';
import { useClientDetail } from '@/hooks/useClientDetail';
import { Pencil, ArrowLeft, Trash2 } from 'lucide-react';
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

    if (!client) {
        return <p className="p-6 text-red-600">Nie znaleziono klienta.</p>;
    }

    return (
        <div className="p-6">
            <CustomerInfoCard client={client} />

            <div className="mt-4 flex gap-2">
                <Button
                    className="hover:bg-gray-600 hover:text-white cursor-pointer transition-colors flex items-center gap-2"
                    onClick={handleEdit}
                    variant="outline"
                >
                    <Pencil size={16} />
                    Edytuj klienta
                </Button>
                <Button
                    className="hover:bg-gray-600 hover:text-white cursor-pointer transition-colors flex items-center gap-2"
                    onClick={handleBack}
                    variant="outline"
                >
                    <ArrowLeft size={16} />
                    Wróć do listy
                </Button>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="destructive"
                            className="hover:bg-red-600 bg-red-500 hover:text-white cursor-pointer transition-colors flex items-center gap-2"
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
                            <AlertDialogCancel className="hover:bg-gray-600 hover:text-white transition-colors cursor-pointer">
                                Anuluj
                            </AlertDialogCancel>
                            <AlertDialogAction
                                className="bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer"
                                onClick={handleDelete}
                            >
                                Usuń
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};

export default CustomerDetail;
