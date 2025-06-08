import { Input } from '@/components/ui/input';
import { ClientSearchResultCard } from './ClientSearchResultCard';
import type { Client } from '@/types/client';

interface Props {
    searchTerm: string;
    setSearchTerm: (val: string) => void;
    clients: Client[];
}

export const ClientSearch = ({ searchTerm, setSearchTerm, clients }: Props) => {
    return (
        <div className="space-y-4">
            <Input
                placeholder="Szukaj klienta po imieniu, mailu lub numerze..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm && (
                <div className="space-y-2">
                    {clients.length > 0 ? (
                        clients.map((client) => (
                            <ClientSearchResultCard key={client._id} client={client} />
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">Brak wyników.</p>
                    )}
                </div>
            )}
        </div>
    );
};
