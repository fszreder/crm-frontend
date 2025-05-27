import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockClients as initialClients } from "../data/mockClients";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const ClientList = () => {
  const navigate = useNavigate();

  // Dodajemy state na klientów
  const [clients, setClients] = useState(initialClients);

  const handleDelete = (id: number) => {
    const confirmed = window.confirm("Czy na pewno chcesz usunąć tego klienta?");
    if (confirmed) {
      const updatedClients = clients.filter((c) => c.id !== id);
      setClients(updatedClients);
    }
  };

  const handleDetails = (id: number) => {
    navigate(`/customers/${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista klientów</h1>
      <div className="flex justify-end mb-4">
        <Button onClick={() => navigate("/customers/new")}>Dodaj klienta</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clients.map((client) => (
          <Card key={client.id}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <div className="font-semibold text-lg">{client.name}</div>
                <div className="text-sm text-gray-500">{client.email}</div>
                <div className="text-sm text-gray-500">{client.phone}</div>
                <div className="text-sm text-gray-500">{client.address}</div>
                <div className="text-sm text-gray-500">{client.notes}</div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleDetails(client.id)}>
                  Szczegóły
                </Button>
                <Button 
                  onClick={() => handleDelete(client.id)} 
                  className="bg-red-500 text-white hover:bg-red-600">
                  Usuń
                </Button>

              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
