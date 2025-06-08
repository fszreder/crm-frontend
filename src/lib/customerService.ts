import api from './api';
import type { Client } from '@/types/client';
import type { Service } from '@/types/service';

export const getCustomers = async (): Promise<Client[]> => {
    const res = await api.get('/customers');
    return res.data;
};

export const getCustomerById = async (id: string): Promise<Client> => {
    const res = await api.get(`/customers/${id}`);
    return res.data;
};

export const createCustomer = async (client: Partial<Client>): Promise<Client> => {
    const res = await api.post('/customers', client);
    return res.data;
};

export const updateCustomer = async (id: string, client: Partial<Client>): Promise<Client> => {
    const res = await api.put(`/customers/${id}`, client);
    return res.data;
};

export const deleteCustomer = async (id: string) => {
    await api.delete(`/customers/${id}`);
};

export const addServiceToClient = async (clientId: string, service: Service) => {
    const res = await api.post(`/customers/${clientId}/services`, service);
    return res.data;
};
