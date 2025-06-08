import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCustomerById } from '@/lib/customerService';
import type { Client } from '@/types/client';
import { deleteCustomer } from '@/lib/customerService';
import { toast } from 'sonner';

export const useClientDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [client, setClient] = useState<Client | null>(null);

    useEffect(() => {
        if (id) {
            getCustomerById(id)
                .then(setClient)
                .catch(() => {
                    console.error('Nie udało się pobrać klienta');
                    navigate('/clientList');
                });
        }
    }, [id, navigate]);

    const handleDelete = async () => {
        if (client) {
            await deleteCustomer(client._id);
            toast.success('Klient został usunięty');
            navigate('/clientList');
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
        handleDelete,
        handleEdit,
        handleBack,
    };
};
