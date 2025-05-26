export type Client = {
    id: number;
    name: string;
    email: string;
    phone: string;
    createdAt: string; // <--- dodaj to
};

export const mockClients: Client[] = [
    {
        id: 1,
        name: 'Jan Kowalski',
        email: 'jan.kowalski@example.com',
        phone: '+48 600 100 200',
        createdAt: '2024-05-21',
    },
    {
        id: 2,
        name: 'Anna Nowak',
        email: 'anna.nowak@example.com',
        phone: '+48 500 200 300',
        createdAt: '2024-05-21',
    },
    {
        id: 3,
        name: 'Michał Wiśniewski',
        email: 'michal@example.com',
        phone: '+48 512 333 444',
        createdAt: '2024-05-23',
    },
    {
        id: 4,
        name: 'Michał Małysz',
        email: 'michal2@example.com',
        phone: '+48 512 333 445',
        createdAt: '2024-05-26',
    },
    {
        id: 5,
        name: 'Piotr Nowicki',
        email: 'piotr@example.com',
        phone: '+48 500 111 222',
        createdAt: '2024-05-26',
    },
    {
        id: 6,
        name: 'Katarzyna Zielińska',
        email: 'katarzyna.zielinska@example.com',
        phone: '+48 601 222 333',
        createdAt: '2024-05-27',
    },
    {
        id: 7,
        name: 'Tomasz Lewandowski',
        email: 'tomasz.lewandowski@example.com',
        phone: '+48 602 333 444',
        createdAt: '2024-05-28',
    },
    {
        id: 8,
        name: 'Agnieszka Dąbrowska',
        email: 'agnieszka.dabrowska@example.com',
        phone: '+48 603 444 555',
        createdAt: '2024-05-29',
    },
    {
        id: 9,
        name: 'Marcin Wójcik',
        email: 'marcin.wojcik@example.com',
        phone: '+48 604 555 666',
        createdAt: '2024-05-30',
    },
    {
        id: 10,
        name: 'Ewa Kaczmarek',
        email: 'ewa.kaczmarek@example.com',
        phone: '+48 605 666 777',
        createdAt: '2024-06-01',
    },
    {
        id: 11,
        name: 'Paweł Pawlak',
        email: 'pawel.pawlak@example.com',
        phone: '+48 606 777 888',
        createdAt: '2024-06-02',
    },
    {
        id: 12,
        name: 'Magdalena Szymańska',
        email: 'magdalena.szymanska@example.com',
        phone: '+48 607 888 999',
        createdAt: '2024-06-03',
    },
    {
        id: 13,
        name: 'Grzegorz Król',
        email: 'grzegorz.krol@example.com',
        phone: '+48 608 999 000',
        createdAt: '2024-06-04',
    },
    {
        id: 14,
        name: 'Joanna Lis',
        email: 'joanna.lis@example.com',
        phone: '+48 609 000 111',
        createdAt: '2024-06-05',
    },
    {
        id: 15,
        name: 'Łukasz Jabłoński',
        email: 'lukasz.jablonski@example.com',
        phone: '+48 610 111 222',
        createdAt: '2024-06-06',
    },
];
