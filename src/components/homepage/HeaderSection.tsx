import { Button } from '@/components/ui/button';
import { AddClientDialog } from '@/components/AddClientDialog';
import type { Client } from '@/data/mockClients';

interface Props {
    isDialogOpen: boolean;
    setIsDialogOpen: (open: boolean) => void;
    onClientAdd: (newClient: Client) => void;
}

export const HeaderSection = ({ isDialogOpen, setIsDialogOpen, onClientAdd }: Props) => (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-4xl font-bold">Witaj w CRM!</h1>
        <div className="flex gap-4">
            <AddClientDialog
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
                onClientAdd={onClientAdd}
            />
            <Button
                variant="outline"
                className="hover:bg-gray-600 hover:text-white cursor-pointer transition-colors flex items-center gap-2"
            >
                Zobacz listę
            </Button>
        </div>
    </div>
);
