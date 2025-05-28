import type { Service } from '@/types/service';

export const initialServices: Service[] = [
    {
        id: 1,
        name: 'Wymiana oleju',
        description: 'Wymiana oleju w samochodzie',
        price: '100 PLN',
    },
    {
        id: 2,
        name: 'Przegląd techniczny',
        description: 'Podstawowy przegląd techniczny',
        price: '200 PLN',
    },
    {
        id: 3,
        name: 'Diagnostyka komputerowa',
        description: 'Podstawowa diagnostyka komputerowa',
        price: '250 PLN',
    },
];
