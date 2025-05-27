import { Card, CardContent } from '@/components/ui/card';

export const AboutSection = () => (
    <Card className="rounded-xl shadow-sm">
        <CardContent className="p-6">
            <p className="text-muted-foreground">
                Witaj w prostym systemie CRM stworzonym dla małych firm. Aplikacja umożliwia
                dodawanie klientów, śledzenie aktywności oraz analizę danych. Wszystko w jednym,
                przejrzystym miejscu.
            </p>
        </CardContent>
    </Card>
);
