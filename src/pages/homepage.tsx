import { useEffect, useState } from 'react';
import { getCustomers } from '@/lib/customerService';
import type { Client } from '@/types/client';
import { HeaderSection } from '@/components/homepage/HeaderSection';
import { StatsCard } from '@/components/homepage/StatsCard';
import { RecentClientsCard } from '@/components/homepage/RecentClientsCard';
import { ClientsChart } from '@/components/homepage/ClientsChart';
import { AboutSection } from '@/components/homepage/AboutSection';
import { ClientSearch } from '@/components/clientsearch/ClientSearch';
import { useClientSearch } from '@/hooks/useClientSearch';
import { useClientStats } from '@/hooks/useClientStats';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const [clients, setClients] = useState<Client[]>([]);

    useEffect(() => {
        getCustomers()
            .then(setClients)
            .catch((err: unknown) => console.error('Błąd ładowania klientów', err));
    }, []);

    const navigate = useNavigate();

    const { searchTerm, setSearchTerm, filteredClients } = useClientSearch(clients);

    const { clientsWithDates, chartData } = useClientStats(clients);

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
            <HeaderSection
                onAddClientClick={() => navigate('/customers/new', { state: { from: 'homepage' } })}
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
                        createdAt:
                            client.createdAt instanceof Date
                                ? client.createdAt.toISOString()
                                : client.createdAt,
                    }))}
                />
            </div>

            <ClientsChart data={chartData} />
        </div>
    );
};
