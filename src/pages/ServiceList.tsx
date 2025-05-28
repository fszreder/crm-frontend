import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialServices } from '@/data/initialServices';
import type { Service } from '@/types/service';
import { ServiceCard } from '@/components/servicelist/ServiceCard';
import { ServiceListHeader } from '@/components/servicelist/ServiceListHeader';
import { AddServiceDialog } from '@/components/servicelist/AddServiceDialog';

export const ServiceList = () => {
    const [services, setServices] = useState<Service[]>(initialServices);
    const navigate = useNavigate();

    const handleDelete = (id: number) => {
        const confirmed = window.confirm('Czy na pewno chcesz usunąć tę usługę?');
        if (confirmed) {
            setServices((prev) => prev.filter((s) => s.id !== id));
        }
    };

    const handleDetails = (id: number) => {
        navigate(`/services/${id}`);
    };

    return (
        <div className="p-6">
            <ServiceListHeader
                nextId={services.length > 0 ? services[services.length - 1].id + 1 : 1}
                onAdd={(newService) => setServices([...services, newService])}
            />

            <AddServiceDialog
                nextId={services.length > 0 ? services[services.length - 1].id + 1 : 1}
                onAdd={(newService) => setServices([...services, newService])}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                        onDelete={handleDelete}
                        onDetails={handleDetails}
                    />
                ))}
            </div>
        </div>
    );
};
