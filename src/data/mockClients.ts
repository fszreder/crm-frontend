// src/data/mockClients.ts
export type Client = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    notes: string;
    createdAt: string; // np. "2025-03-01"
};

export let mockClients: Client[] = [
    {
        id: 1,
        name: 'Jan Kowalski',
        email: 'jan.kowalski@example.com',
        phone: '+48 600 100 200',
        address: 'Polska',
        notes: 'Stały klient',
        createdAt: '2024-12-20',
    },
    {
        id: 2,
        name: 'Anna Nowak',
        email: 'anna.nowak@example.com',
        phone: '+48 500 200 300',
        address: 'Polska',
        notes: 'Nowy klient',
        createdAt: '2025-01-05',
    },
    {
        id: 3,
        name: 'Michał Wiśniewski',
        email: 'michal@example.com',
        phone: '+48 512 333 444',
        address: 'Polska',
        notes: 'VIP',
        createdAt: '2025-03-01',
    },
];

// Funkcje do obsługi danych w pamięci
export const deleteClient = (id: number) => {
    mockClients = mockClients.filter((client) => client.id !== id);
};

export const updateClient = (id: number, updatedData: Partial<Client>) => {
    mockClients = mockClients.map((client) =>
        client.id === id ? { ...client, ...updatedData } : client
    );
};
