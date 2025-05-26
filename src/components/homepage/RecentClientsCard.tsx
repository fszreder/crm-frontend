import { Card, CardContent } from '@/components/ui/card';
import type { Client } from '@/data/mockClients';

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
                    <div key={client.id} className="text-sm">
                        {client.name}
                    </div>
                ))}
        </CardContent>
    </Card>
);
