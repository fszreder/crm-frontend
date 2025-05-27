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

  const handleDelete = () => {
    const confirmed = window.confirm("Czy na pewno chcesz usunąć tego klienta?");
    if (confirmed) {
      const index = mockClients.findIndex((c) => c.id === client.id);
      if (index !== -1) mockClients.splice(index, 1);
      console.log("🗑️ Usunięto klienta:", client.id);
      navigate("/customers");
    }
  };

  return (
    <div className="p-6">
      <Card>
        <CardContent className="p-4 space-y-2">
          <h2 className="text-xl font-bold">{client.name}</h2>
          <p>Email: {client.email}</p>
          <p>Telefon: {client.phone}</p>
          <p>Adres: {client.address}</p>
          <p>Notatki: {client.notes}</p>
        </CardContent>
      </Card>

      <div className="mt-4 flex gap-2">
        <Button onClick={() => navigate(`/customers/${client.id}/edit`)}>Edytuj klienta</Button>
        <Button variant="outline" onClick={() => navigate("/customers")}>Wróć do listy</Button>
        <Button variant="destructive" onClick={handleDelete}>Usuń klienta</Button>
      </div>
    </div>
  );
};

export default CustomerDetail;
