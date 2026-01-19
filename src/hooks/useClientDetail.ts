import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCustomerById, deleteCustomer } from '@/lib/customerService';
import type { Client } from '@/types/client';
import { toast } from 'sonner';

export const useClientDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [client, setClient] = useState<Client | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchClient = useCallback(() => {
        if (!id) return;

        setLoading(true);

        getCustomerById(id)
            .then((data) => {
                if (data && typeof data === 'object') {
                    setClient(data);
                } else {
                    throw new Error('Zły format danych');
                }
            })
            .catch(() => {
                toast.error('Nie udało się pobrać klienta');
                navigate('/clientList');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id, navigate]);

    useEffect(() => {
        fetchClient();
    }, [fetchClient]);

    const handleDelete = async () => {
        if (!client) return;

        try {
            await deleteCustomer(client._id);
            toast.success('Klient został usunięty');
            navigate('/clientList');
        } catch {
            toast.error('Nie udało się usunąć klienta');
        }
    };

    const handleEdit = () => {
        if (client) navigate(`/customers/${client._id}/edit`);
    };

    const handleBack = () => {
        navigate('/clientList');
    };

    return {
        client,
        loading,
        handleDelete,
        handleEdit,
        handleBack,
        refetch: fetchClient,
    };
};
