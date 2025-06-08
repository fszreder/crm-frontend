import { useState, useMemo } from 'react';
import type { Client } from '@/types/client';

export const useClientSearch = (clients: Client[]) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredClients = useMemo(() => {
        const term = searchTerm.toLowerCase();

        const filtered = clients.filter((client) => {
            const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
            const email = client.email.toLowerCase();
            const phone = client.phone.replace(/\s+/g, '');

            return fullName.includes(term) || email.includes(term) || phone.includes(term);
        });

        filtered.sort((a, b) => {
            const aFullName = `${a.firstName} ${a.lastName}`.toLowerCase();
            const bFullName = `${b.firstName} ${b.lastName}`.toLowerCase();

            const aStarts = aFullName.startsWith(term);
            const bStarts = bFullName.startsWith(term);

            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;

            return aFullName.localeCompare(bFullName);
        });

        return filtered;
    }, [clients, searchTerm]);

    return { searchTerm, setSearchTerm, filteredClients };
};
