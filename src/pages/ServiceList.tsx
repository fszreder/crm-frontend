import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialServices } from '@/data/initialServices';
import type { Service } from '@/types/service';
import { ServiceCard } from '@/components/servicelist/ServiceCard';
import { ServiceListHeader } from '@/components/servicelist/ServiceListHeader';
import { Button } from '@/components/ui/button';

export const ServiceList = () => {
    const [services, setServices] = useState<Service[]>(initialServices);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    const handleDelete = (id: number) => {
        setServices((prev) => prev.filter((s) => s.id !== id));
    };

    const handleDetails = (id: number) => {
        navigate(`/services/${id}`);
    };

    const filteredAndSortedServices = [...services]
        .filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            return sortDirection === 'asc'
                ? parseFloat(a.price) - parseFloat(b.price)
                : parseFloat(b.price) - parseFloat(a.price);
        });

    const toggleSort = () => {
        setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    };

    return (
        <div className="p-6">
            <ServiceListHeader
                nextId={services.length > 0 ? services[services.length - 1].id + 1 : 1}
                onAdd={(newService) => setServices([...services, newService])}
            />

            <div className="flex justify-between items-center mb-4 gap-4">
                <input
                    type="text"
                    placeholder="Szukaj usługi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-md shadow-sm"
                />
                <Button variant="outline" onClick={toggleSort}>
                    Cena {sortDirection === 'desc' ? '▼' : '▲'}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAndSortedServices.map((service) => (
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
