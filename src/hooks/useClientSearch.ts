import { useState, useMemo } from 'react';
import type { Client } from '@/data/mockClients';

export const useClientSearch = (clients: Client[]) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredClients = useMemo(() => {
        const term = searchTerm.toLowerCase();

        const filtered = clients.filter(
            (client) =>
                client.name.toLowerCase().includes(term) ||
                client.email.toLowerCase().includes(term) ||
                client.phone.replace(/\s+/g, '').includes(term)
        );

        filtered.sort((a, b) => {
            const aStarts = a.name.toLowerCase().startsWith(term);
            const bStarts = b.name.toLowerCase().startsWith(term);

            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;

            return a.name.localeCompare(b.name);
        });

        return filtered;
    }, [clients, searchTerm]);

    return { searchTerm, setSearchTerm, filteredClients };
};
