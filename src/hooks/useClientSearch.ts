import { useState, useMemo } from 'react';
import type { Client } from '@/types/client';

export const useClientSearch = (clients: Client[] | undefined) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredClients = useMemo(() => {
        const safeClients = Array.isArray(clients) ? clients : [];

        const term = searchTerm.toLowerCase();

        return safeClients
            .filter((client) => {
                const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
                const email = client.email.toLowerCase();
                const phone = client.phone.replace(/\s+/g, '');

                return fullName.includes(term) || email.includes(term) || phone.includes(term);
            })
            .sort((a, b) =>
                `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
            );
    }, [clients, searchTerm]);

    return { searchTerm, setSearchTerm, filteredClients };
};
