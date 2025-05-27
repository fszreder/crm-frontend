import { Input } from '@/components/ui/input';

export const SearchBar = () => (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <Input placeholder="Szukaj klienta..." className="w-full md:w-1/3" />
    </div>
);
