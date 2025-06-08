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
import { motion } from 'framer-motion';

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
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <HeaderSection
                    onAddClientClick={() =>
                        navigate('/customers/new', { state: { from: 'homepage' } })
                    }
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <AboutSection />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <ClientSearch
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    clients={filteredClients}
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
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
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <ClientsChart data={chartData} />
            </motion.div>
        </div>
    );
};
