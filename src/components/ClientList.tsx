import { mockClients } from "../data/mockClients";
import type { Client } from "../data/mockClients";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const ClientList = () => {
  return (
    <div className="grid gap-4">
      {mockClients.map((client: Client) => (
        <Card key={client.id}>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <div className="font-semibold text-lg">{client.name}</div>
              <div className="text-sm text-gray-500">{client.email}</div>
              <div className="text-sm text-gray-500">{client.phone}</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Edytuj</Button>
              <Button variant="destructive">Usuńa</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};