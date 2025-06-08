import { useNavigate } from 'react-router-dom';
import type { Client } from '@/types/client';

interface Props {
    client: Client;
}

export const ClientSearchResultCard = ({ client }: Props) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/customers/${client._id}`)}
            className="p-3 border rounded hover:bg-gray-100 cursor-pointer transition-colors"
        >
            <div className="font-semibold">
                {client.firstName} {client.lastName}
            </div>
            <div className="text-sm text-gray-500">{client.email}</div>
            <div className="text-sm text-gray-500">{client.phone}</div>
        </div>
    );
};
