// src/data/mockClients.ts
export type Client = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    notes: string;
    createdAt: string;
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
    {
        id: 4,
        name: 'Katarzyna Zielińska',
        email: 'katarzyna.zielinska@example.com',
        phone: '+48 601 222 333',
        address: 'Polska',
        notes: 'Potencjalny klient',
        createdAt: '2025-03-01',
    },
    {
        id: 5,
        name: 'Piotr Nowicki',
        email: 'piotr.nowicki@example.com',
        phone: '+48 604 555 666',
        address: 'Polska',
        notes: 'Brak uwag',
        createdAt: '2025-02-15',
    },
    {
        id: 6,
        name: 'Ewa Maj',
        email: 'ewa.maj@example.com',
        phone: '+48 607 777 888',
        address: 'Polska',
        notes: 'Klientka premium',
        createdAt: '2025-02-15',
    },
    {
        id: 7,
        name: 'Tomasz Lis',
        email: 'tomasz.lis@example.com',
        phone: '+48 609 999 000',
        address: 'Polska',
        notes: 'Brak kontaktu',
        createdAt: '2025-01-20',
    },
    {
        id: 8,
        name: 'Agnieszka Dąbrowska',
        email: 'agnieszka.dabrowska@example.com',
        phone: '+48 602 123 456',
        address: 'Polska',
        notes: 'Zainteresowana ofertą',
        createdAt: '2025-01-20',
    },
    {
        id: 9,
        name: 'Marcin Wójcik',
        email: 'marcin.wojcik@example.com',
        phone: '+48 603 654 321',
        address: 'Polska',
        notes: 'Klient z polecenia',
        createdAt: '2025-03-10',
    },
    {
        id: 10,
        name: 'Paulina Lewandowska',
        email: 'paulina.lewandowska@example.com',
        phone: '+48 605 321 654',
        address: 'Polska',
        notes: 'Brak uwag',
        createdAt: '2025-02-28',
    },
];

export const deleteClient = (id: number) => {
    mockClients = mockClients.filter((client) => client.id !== id);
};

export const updateClient = (id: number, updatedData: Partial<Client>) => {
    mockClients = mockClients.map((client) =>
        client.id === id ? { ...client, ...updatedData } : client
    );
};
