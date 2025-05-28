import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { SortOption, DateFilter } from '@/hooks/useClientList';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Props {
    searchTerm: string;
    setSearchTerm: (val: string) => void;
    sortOption: SortOption;
    setSortOption: (val: SortOption) => void;
    onAddClient: () => void;
    dateFilter: DateFilter;
    setDateFilter: (val: DateFilter) => void;
}

export const ClientListControls = ({
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    dateFilter,
    setDateFilter,
    onAddClient,
}: Props) => {
    return (
        <div className="p-4 border rounded-md mb-6 space-y-4 bg-white shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <Input
                    placeholder="Szukaj klienta..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-xs"
                />

                <Button
                    className="hover:bg-gray-600 hover:text-white cursor-pointer transition-colors flex items-center gap-2"
                    variant="outline"
                    onClick={() =>
                        setSortOption(sortOption === 'name-asc' ? 'name-desc' : 'name-asc')
                    }
                >
                    Sortuj {sortOption === 'name-asc' ? 'Z–A' : 'A–Z'}
                </Button>

                <Select
                    value={dateFilter}
                    onValueChange={(val) => setDateFilter(val as DateFilter)}
                >
                    <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Filtr daty" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-zinc-800 text-black dark:text-white shadow-lg border rounded-md">
                        <SelectItem value="all">Wszyscy</SelectItem>
                        <SelectItem value="last-7-days">Ostatnie 7 dni</SelectItem>
                    </SelectContent>
                </Select>

                <Button
                    className="hover:bg-gray-600 hover:text-white cursor-pointer transition-colors flex items-center gap-2"
                    variant="outline"
                    onClick={onAddClient}
                >
                    Dodaj klienta
                </Button>
            </div>
        </div>
    );
};
