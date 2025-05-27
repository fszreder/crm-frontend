import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockClients } from "../data/mockClients";

const Dashboard = () => {
  const navigate = useNavigate();
  const totalClients = mockClients.length;

  return (
    

    <div className="p-6 space-y-6">
      <Card>
        <CardContent className="p-4">
          <h1 className="text-2xl font-bold mb-2">CRM Dashboard</h1>
          <p>Witaj w aplikacji CRM! Tutaj możesz zarządzać swoimi klientami.</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Liczba klientów</h2>
            <p className="text-3xl">{totalClients}</p>
          </div>
          <Button onClick={() => navigate("/customers")}>Przejdź do klientów</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold">Statystyki</h2>
          <p>{totalClients} aktywnych klientów</p>
          {/* Tu w przyszłości można dodać wykresy np. za pomocą chart.js */}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
