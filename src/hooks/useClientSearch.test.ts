import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useClientSearch } from './useClientSearch';
import type { Client } from '@/types/client';

const mockClients: Client[] = [
    {
        _id: '1',
        firstName: 'Jan',
        lastName: 'Kowalski',
        email: 'jan@test.pl',
        phone: '123456789',
        address: {
            street: 'Testowa 1',
            city: 'Warszawa',
            zip: '00-001',
        },
        notes: '',
        services: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        _id: '2',
        firstName: 'Anna',
        lastName: 'Nowak',
        email: 'anna@test.pl',
        phone: '987654321',
        address: {
            street: 'Testowa 2',
            city: 'Kraków',
            zip: '00-002',
        },
        notes: '',
        services: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

describe('useClientSearch', () => {
    it('filtruje klientów po imieniu', () => {
        const { result } = renderHook(() => useClientSearch(mockClients));

        act(() => {
            result.current.setSearchTerm('jan');
        });

        expect(result.current.filteredClients.length).toBe(1);
        expect(result.current.filteredClients[0].firstName).toBe('Jan');
    });
});
