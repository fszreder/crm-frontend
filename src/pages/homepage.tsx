import { useState } from 'react';
import { mockClients } from '@/data/mockClients';
import type { Client } from '@/data/mockClients';
import { HeaderSection } from '@/components/homepage/HeaderSection';
import { StatsCard } from '@/components/homepage/StatsCard';
import { RecentClientsCard } from '@/components/homepage/RecentClientsCard';
import { ClientsChart } from '@/components/homepage/ClientsChart';
import { AboutSection } from '@/components/homepage/AboutSection';
import { ClientSearch } from '@/components/clientsearch/ClientSearch';
import { useClientSearch } from '@/hooks/useClientSearch';
import { useClientStats } from '@/hooks/useClientStats';
export const HomePage = () => {
    const [clients, setClients] = useState<Client[]>(mockClients);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { searchTerm, setSearchTerm, filteredClients } = useClientSearch(clients);
    const { clientsWithDates, chartData } = useClientStats(clients);

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

            <ClientSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                clients={filteredClients}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatsCard total={clients.length} />
                <RecentClientsCard
                    clients={clientsWithDates.map((client) => ({
                        ...client,
                        createdAt: client.createdAt.toISOString(),
                    }))}
                />
            </div>
            <ClientsChart data={chartData} />
        </div>
    );
};
