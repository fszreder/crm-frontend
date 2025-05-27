import { useState } from 'react';
import { mockClients } from '@/data/mockClients';
import type { Client } from '@/data/mockClients';
import { parseISO, format } from 'date-fns';
import { HeaderSection } from '@/components/homepage/HeaderSection';
import { SearchBar } from '@/components/homepage/SearchBar';
import { StatsCard } from '@/components/homepage/StatsCard';
import { RecentClientsCard } from '@/components/homepage/RecentClientsCard';
import { ClientsChart } from '@/components/homepage/ClientsChart';
import { AboutSection } from '@/components/homepage/AboutSection';

export const HomePage = () => {
    const [clients, setClients] = useState<Client[]>(mockClients);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const clientsWithDates = clients.map((client) => ({
        ...client,
        createdAt: parseISO(client.createdAt),
    }));

    const grouped = clientsWithDates.reduce(
        (acc, client) => {
            const date = format(client.createdAt, 'dd.MM');
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        },
        {} as Record<string, number>
    );

    const chartData = Object.entries(grouped).map(([date, count]) => ({
        date,
        count,
    }));

    const handleClientAdd = (newClient: Client) => {
        setClients([...clients, newClient]);
        setIsDialogOpen(false);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
            <HeaderSection
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                onClientAdd={handleClientAdd}
            />

            <AboutSection />

            <SearchBar />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatsCard total={clients.length} />
                <RecentClientsCard clients={clients} />
            </div>
            <ClientsChart data={chartData} />
        </div>
    );
};
