import { useState } from 'react';
import type { Service } from '@/types/service';

export const useClientServices = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

    const addService = (service: Service) => {
        if (!service || typeof service !== 'object') return;

        setServices((prev) => {
            const safe = Array.isArray(prev) ? prev : [];
            return [...safe, service];
        });

        setSelectedClientId(null);
    };

    const resetServices = () => {
        setServices([]);
        setSelectedClientId(null);
    };

    return {
        services,
        selectedClientId,
        setSelectedClientId,
        addService,
        resetServices,
    };
};
