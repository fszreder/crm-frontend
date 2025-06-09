import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const HeaderSection = ({ onAddClientClick }: { onAddClientClick: () => void }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className="text-2xl font-bold">Witaj w CRM!</h1>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Button
                    className="hover:bg-blue-600 hover:text-white cursor-pointer transition-colors flex items-center gap-2"
                    onClick={onAddClientClick}
                    variant="outline"
                >
                    + Dodaj klienta
                </Button>
                <Button
                    className="hover:bg-gray-600 hover:text-white cursor-pointer transition-colors flex items-center gap-2"
                    variant="outline"
                    onClick={() => navigate('/clientList')}
                >
                    Zobacz listę klientów
                </Button>
                <Button
                    className="hover:bg-gray-600 hover:text-white cursor-pointer transition-colors flex items-center gap-2"
                    variant="outline"
                    onClick={() => {
                        localStorage.removeItem('token');
                        navigate('/login');
                    }}
                >
                    Wyloguj się
                </Button>
            </div>
        </div>
    );
};
