import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockClients } from '@/data/mockClients';
import { subDays, parseISO } from 'date-fns';
import { toast } from 'sonner';

export type SortOption = 'name-asc' | 'name-desc';
export type DateFilter = 'all' | 'last-7-days';

export const useClientList = () => {
    const [clients, setClients] = useState(mockClients);
    const [sortOption, setSortOption] = useState<SortOption>('name-asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState<DateFilter>('all');
    const navigate = useNavigate();

    const handleDelete = (id: number) => {
        setClients((prev) => prev.filter((c) => c.id !== id));
        toast.success('Klient został usunięty');
    };

    const handleDetails = (id: number | 'new' | 'dashboard') => {
        if (id === 'new') navigate('/customers/new');
        else if (id === 'dashboard') navigate('/homepage');
        else navigate(`/customers/${id}`);
    };

    const filteredAndSortedClients = useMemo(() => {
        const search = searchTerm.toLowerCase();
        const now = new Date();

        const filtered = clients.filter((client) => {
            const matchName = client.name.toLowerCase().includes(search);
            const createdDate = parseISO(client.createdAt);
            const matchDate = dateFilter === 'all' || createdDate >= subDays(now, 7);

            return matchName && matchDate;
        });

        filtered.sort((a, b) => {
            const aStarts = a.name.toLowerCase().startsWith(search);
            const bStarts = b.name.toLowerCase().startsWith(search);

            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;

            return sortOption === 'name-asc'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
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
    };
};
