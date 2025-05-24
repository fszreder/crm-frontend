import { mockClients } from "../data/mockClients";
import type { Client } from "../data/mockClients";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const ClientList = () => {
  const navigate = useNavigate();

  const handleDelete = (id: number | string) => {
    console.log("Usuń klienta o ID:", id);
    // Tu można dodać fetch:
    // fetch(`/customers/${id}`, { method: 'DELETE' })
  };

  const handleDetails = (id: number | string) => {
    navigate(`/customers/${id}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <Button onClick={() => navigate("/customers/new")}>Dodaj klienta</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockClients.map((client) => (
          <Card key={client.id}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <div className="font-semibold text-lg">{client.name}</div>
                <div className="text-sm text-gray-500">{client.email}</div>
                <div className="text-sm text-gray-500">{client.phone}</div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleDetails(client.id)}>
                  Szczegóły
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(client.id)}>
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
