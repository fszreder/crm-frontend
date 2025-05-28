import { Card, CardContent } from '@/components/ui/card';
import type { Client } from '@/data/mockClients';

interface Props {
    client: Client;
}

export const CustomerInfoCard = ({ client }: Props) => (
    <Card>
        <CardContent className="p-4 space-y-2">
            <h2 className="text-xl font-bold">{client.name}</h2>
            <p>Email: {client.email}</p>
            <p>Telefon: {client.phone}</p>
            <p>Adres: {client.address}</p>
            <p>Notatki: {client.notes}</p>
        </CardContent>
    </Card>
);
