import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";


const initialServices = [
  { id: 1, name: "Wymiana oleju", description: "Wymiana oleju w samochodzie", price: "100 PLN" },
  { id: 2, name: "Przegląd techniczny", description: "Podstawowy przegląd techniczny ", price: "200 PLN" },
  { id: 3, name: "Diagnostyka komputerowa", description: "Podtsawowa diagnostyka komputerowa", price: "250 PLN" },
];

export const ServiceList = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState(initialServices);

  const handleDelete = (id: number) => {
    const confirmed = window.confirm("Czy na pewno chcesz usunąć tę usługę?");
    if (confirmed) {
      const updatedServices = services.filter((s) => s.id !== id);
      setServices(updatedServices);
    }
  };

  const handleAdd = () => {
    const newName = prompt("Podaj nazwę nowej usługi:");
    const newDescription = prompt("Podaj opis nowej usługi:");
    const newPrice = prompt("Podaj cenę nowej usługi:");

    if (newName && newDescription && newPrice) {
      const newService = {
        id: services.length > 0 ? services[services.length - 1].id + 1 : 1,
        name: newName,
        description: newDescription,
        price: newPrice,
      };
      setServices([...services, newService]);
    } else {
      alert("Wszystkie pola muszą być uzupełnione!");
    }
  };

  const handleDetails = (id: number) => {
    navigate(`/services/${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista usług</h1>
      <div className="flex justify-end mb-4">
        <Button onClick={handleAdd}>Dodaj usługę</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <div className="font-semibold text-lg">{service.name}</div>
                <div className="text-sm text-gray-500">{service.description}</div>
                <div className="text-sm text-gray-500">{service.price}</div>
              </div>
              <div className="flex gap-2">
                
                <Button
                  onClick={() => handleDelete(service.id)}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
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
