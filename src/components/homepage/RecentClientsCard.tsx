import { Card, CardContent } from '@/components/ui/card';
import type { Client } from '@/types/client';

interface Props {
    clients: Client[];
}

export const RecentClientsCard = ({ clients }: Props) => (
    <Card>
        <CardContent className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Ostatnio dodani</div>
            {clients
                .slice(-3)
                .reverse()
                .map((client) => (
                    <div key={client._id} className="text-sm">
                        {client.firstName} {client.lastName}
                    </div>
                ))}
        </CardContent>
    </Card>
);
