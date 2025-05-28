import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { countryCodes } from '@/data/countryCodes';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface Props {
    value: string;
    onChange: (val: string) => void;
}

export const CountryCodeCombobox = ({ value, onChange }: Props) => {
    const [open, setOpen] = useState(false);

    const selected = countryCodes.find((c) => c.dial_code === value);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-36 justify-between"
                >
                    {selected ? (
                        <span className="flex items-center gap-2">
                            <img
                                src={`https://flagcdn.com/24x18/${selected.code.toLowerCase()}.png`}
                                alt={selected.code}
                                className="w-5 h-4 rounded-sm object-cover"
                            />
                            {selected.code}
                        </span>
                    ) : (
                        'Wybierz kraj'
                    )}
                    <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-0 bg-white border-gray-200">
                <Command>
                    <div className="sticky top-0 z-10 bg-white px-1 py-1">
                        <CommandInput placeholder="Szukaj kraju..." />
                    </div>
                    <CommandEmpty>Nie znaleziono kraju.</CommandEmpty>
                    <CommandGroup
                        className="max-h-72 overflow-y-auto focus:outline-none"
                        tabIndex={0}
                    >
                        {countryCodes.map((country) => (
                            <CommandItem
                                key={country.code}
                                value={country.name}
                                onSelect={() => {
                                    onChange(country.dial_code);
                                    setOpen(false);
                                }}
                            >
                                <span className="flex items-center gap-2">
                                    <img
                                        src={`https://flagcdn.com/24x18/${country.code.toLowerCase()}.png`}
                                        alt={country.code}
                                        className="w-5 h-4 rounded-sm object-cover"
                                    />
                                    {country.name} {country.dial_code}
                                </span>
                                <Check
                                    className={cn(
                                        'ml-auto h-4 w-4',
                                        value === country.dial_code ? 'opacity-100' : 'opacity-0'
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
