import { Button } from '@/components/ui/button';
import { AddClientDialog } from '@/components/AddClientDialog';
import type { Client } from '@/data/mockClients';
import { useNavigate } from 'react-router-dom'; // <- dodaj to

interface Props {
    isDialogOpen: boolean;
    setIsDialogOpen: (open: boolean) => void;
    onClientAdd: (newClient: Client) => void;
}

export const HeaderSection = ({ isDialogOpen, setIsDialogOpen, onClientAdd }: Props) => {
    const navigate = useNavigate();

    return (
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
                    onClick={() => navigate('/clientList')}
                >
                    Zobacz listę
                </Button>
            </div>
        </div>
    );
};
