import { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { subDays, parseISO } from 'date-fns';
import { toast } from 'sonner';
import { getCustomers } from '@/lib/customerService';
import type { Client } from '@/types/client';

export type SortOption = 'name-asc' | 'name-desc';
export type DateFilter = 'all' | 'last-7-days';

export const useClientList = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [sortOption, setSortOption] = useState<SortOption>('name-asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState<DateFilter>('all');
    const navigate = useNavigate();

    const refetchClients = useCallback(() => {
        getCustomers()
            .then(setClients)
            .catch(() => toast.error('Nie udało się pobrać klientów'));
    }, []);

    useEffect(() => {
        refetchClients();
    }, [refetchClients]);

    const handleDelete = (id: string) => {
        setClients((prev) => prev.filter((c) => c._id !== id));
        toast.success('Klient został usunięty');
    };

    const handleDetails = (id: string | 'new' | 'dashboard') => {
        if (id === 'new') navigate('/customers/new');
        else if (id === 'dashboard') navigate('/homepage');
        else navigate(`/customers/${id}`);
    };

    const filteredAndSortedClients = useMemo(() => {
        const search = searchTerm.toLowerCase();
        const now = new Date();

        const filtered = clients.filter((client) => {
            const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
            const matchName = fullName.includes(search);

            const createdDate = parseISO(client.createdAt);
            const matchDate = dateFilter === 'all' || createdDate >= subDays(now, 7);

            return matchName && matchDate;
        });

        filtered.sort((a, b) => {
            const aName = `${a.firstName} ${a.lastName}`.toLowerCase();
            const bName = `${b.firstName} ${b.lastName}`.toLowerCase();

            const aStarts = aName.startsWith(search);
            const bStarts = bName.startsWith(search);

            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;

            return sortOption === 'name-asc'
                ? aName.localeCompare(bName)
                : bName.localeCompare(aName);
        });

        return filtered;
    }, [clients, sortOption, searchTerm, dateFilter]);

    return {
        clients: filteredAndSortedClients,
        searchTerm,
        setSearchTerm,
        sortOption,
        setSortOption,
        dateFilter,
        setDateFilter,
        handleDelete,
        handleDetails,
        refetchClients,
    };
};
