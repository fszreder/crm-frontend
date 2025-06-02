import { useState } from 'react';
import type { Service } from '@/types/service';

export const useClientServices = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

    const addService = (service: Service) => {
        setServices((prev) => [...prev, service]);
        setSelectedClientId(null);
    };

    return {
        services,
        selectedClientId,
        setSelectedClientId,
        addService,
    };
};
