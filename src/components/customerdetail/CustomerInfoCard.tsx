import { Card, CardContent } from '@/components/ui/card';
import type { Client } from '@/types/client';

interface Props {
    client: Client;
}

export const CustomerInfoCard = ({ client }: Props) => (
    <Card>
        <CardContent className="min-w-0 break-words w-full">
            <h2 className="text-xl font-bold">
                {client.firstName} {client.lastName}
            </h2>
            <p>Email: {client.email}</p>
            <p>Telefon: {client.phone}</p>
            <p>
                Adres: {client.address.street}, {client.address.zip} {client.address.city}
            </p>
            <p>Notatki: {client.notes}</p>
        </CardContent>
    </Card>
);
