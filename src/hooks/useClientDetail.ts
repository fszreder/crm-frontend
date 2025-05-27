import { useParams, useNavigate } from 'react-router-dom';
import { mockClients } from '@/data/mockClients';
import { useMemo } from 'react';
import type { Client } from '@/data/mockClients';

export const useClientDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const client = useMemo<Client | undefined>(() => {
        return mockClients.find((c) => c.id.toString() === id);
    }, [id]);

    const handleDelete = () => {
        if (!client) return;
        const index = mockClients.findIndex((c) => c.id === client.id);
        if (index !== -1) mockClients.splice(index, 1);
        console.log('Usunięto klienta:', client.id);
        navigate('/clientList');
    };

    const handleEdit = () => {
        if (client) navigate(`/customers/${client.id}/edit`);
    };

    const handleBack = () => {
        navigate('/clientList');
    };

    return {
        client,
        handleDelete,
        handleEdit,
        handleBack,
    };
};
