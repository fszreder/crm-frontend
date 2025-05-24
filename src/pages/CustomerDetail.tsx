import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockClients } from "../data/mockClients";

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const client = mockClients.find((c) => c.id.toString() === id);

  if (!client) {
    return <p className="p-6 text-red-600">Nie znaleziono klienta.</p>;
  }

  return (
    <div className="p-6">
      <Card>
        <CardContent className="p-4 space-y-2">
          <h2 className="text-xl font-bold">{client.name}</h2>
          <p>Email: {client.email}</p>
          <p>Telefon: {client.phone}</p>
          <p>Adres: (tu można dodać adres w przyszłości)</p>
          <p>Notatki: (tu edytowalne notatki w przyszłości)</p>
        </CardContent>
      </Card>

      <div className="mt-4 flex gap-2">
        <Button onClick={() => navigate(`/customers/${client.id}/edit`)}>
          Edytuj klienta
        </Button>
        <Button variant="outline" onClick={() => navigate("/customers")}>
          Wróć do listy
        </Button>
      </div>
    </div>
  );
};

export default CustomerDetail;
