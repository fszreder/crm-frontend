import { Button } from '@/components/ui/button';
import { ClientCard } from '@/components/clientlist/ClientCard';
import { ClientListControls } from '@/components/clientlist/ClientListControls';
import { useClientList } from '@/hooks/useClientList';
import { useClientServices } from '@/hooks/useClientServices';
import { useNavigate } from 'react-router-dom';
import { AddServiceDialog } from '@/components/clientlist/AddServiceDialog';

export const ClientList = () => {
    const navigate = useNavigate();
    const {
        clients,
        handleDelete,
        handleDetails,
        sortOption,
        setSortOption,
        searchTerm,
        setSearchTerm,
        dateFilter,
        setDateFilter,
    } = useClientList();

    const { services, selectedClientId, setSelectedClientId, addService } = useClientServices();

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
                        key={client.id}
                        client={client}
                        onDetails={handleDetails}
                        onDelete={handleDelete}
                        onAddService={(id) => setSelectedClientId(id)}
                        services={services}
                    />
                ))}
                {selectedClientId !== null && (
                    <AddServiceDialog
                        clientId={selectedClientId}
                        onAdd={addService}
                        onClose={() => setSelectedClientId(null)}
                        nextId={services.length + 1}
                    />
                )}
            </div>
        </div>
    );
};
