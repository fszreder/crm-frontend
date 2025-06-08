import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ClientCard } from '@/components/clientlist/ClientCard';
import { ClientListControls } from '@/components/clientlist/ClientListControls';
import { AddServiceDialog } from '@/components/clientlist/AddServiceDialog';
import { useClientList } from '@/hooks/useClientList';
import { useNavigate } from 'react-router-dom';
import { deleteCustomer, addServiceToClient } from '@/lib/customerService';
import { toast } from 'sonner';
import type { Service } from '@/types/service';

interface Props {
    onClientChanged?: () => void;
}

export const ClientList = ({ onClientChanged }: Props) => {
    const navigate = useNavigate();
    const {
        clients,
        handleDetails,
        sortOption,
        setSortOption,
        searchTerm,
        setSearchTerm,
        dateFilter,
        setDateFilter,
        refetchClients,
    } = useClientList();

    const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        try {
            await deleteCustomer(id);
            toast.success('Klient został usunięty');
            onClientChanged?.();
            refetchClients?.();
        } catch (err) {
            toast.error('Błąd podczas usuwania klienta');
            console.error(err);
        }
    };

    const handleAddService = async (service: Service) => {
        if (!selectedClientId) return;
        try {
            await addServiceToClient(selectedClientId, service);
            toast.success('Usługa została dodana');
            refetchClients();
        } catch (error) {
            toast.error('Błąd podczas dodawania usługi');
            console.error(error);
        } finally {
            setSelectedClientId(null);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <Button
                    className="cursor-pointer self-start text-sm text-gray-600 hover:text-black transition-colors"
                    variant="outline"
                    onClick={() => navigate('/homepage')}
                >
                    ← Wróć na dashboard
                </Button>
            </div>

            <h1 className="text-2xl font-bold mb-4">Lista klientów</h1>

            <ClientListControls
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortOption={sortOption}
                setSortOption={setSortOption}
                dateFilter={dateFilter}
                setDateFilter={setDateFilter}
                onAddClient={() => navigate('/customers/new')}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clients.map((client) => (
                    <ClientCard
                        key={client._id}
                        client={client}
                        onDetails={handleDetails}
                        onDelete={handleDelete}
                        onAddService={(id) => setSelectedClientId(id)}
                    />
                ))}

                {selectedClientId && (
                    <AddServiceDialog
                        clientId={Number(selectedClientId)}
                        onAdd={handleAddService}
                        onClose={() => setSelectedClientId(null)}
                        nextId={0}
                    />
                )}
            </div>
        </div>
    );
};
