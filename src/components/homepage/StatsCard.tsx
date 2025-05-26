import { Card, CardContent } from '@/components/ui/card';

interface Props {
    total: number;
}

export const StatsCard = ({ total }: Props) => (
    <Card>
        <CardContent className="p-6">
            <div className="text-sm text-muted-foreground">Liczba klientów</div>
            <div className="text-3xl font-bold">{total}</div>
        </CardContent>
    </Card>
);
