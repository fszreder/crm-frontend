import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
    data: { date: string; count: number }[];
}

export const ClientsChart = ({ data }: Props) => (
    <Card>
        <CardContent className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Liczba klientów w czasie</div>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line type="linear" dataKey="count" stroke="#4a90e2" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
);
