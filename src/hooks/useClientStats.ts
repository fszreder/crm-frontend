import { parseISO, format } from 'date-fns';
import type { Client } from '@/types/client';

interface ChartDataPoint {
    date: string;
    count: number;
}

export const useClientStats = (clients: Client[]) => {
    const clientsWithDates = clients.map((client) => ({
        ...client,
        createdAt: parseISO(client.createdAt),
    }));

    const grouped = clientsWithDates.reduce(
        (acc, client) => {
            const date = format(client.createdAt, 'dd.MM');
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        },
        {} as Record<string, number>
    );

    const chartData: ChartDataPoint[] = Object.entries(grouped).map(([date, count]) => ({
        date,
        count,
    }));

    return {
        clientsWithDates,
        chartData,
    };
};
