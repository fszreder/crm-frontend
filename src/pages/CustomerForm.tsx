import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockClients } from "../data/mockClients";

export const CustomerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  useEffect(() => {
    if (id) {
      const client = mockClients.find((c) => c.id.toString() === id);
      if (client) {
        setFormData({
          name: client.name,
          email: client.email,
          phone: client.phone,
          address: client.address,
          notes: client.notes,
        });
      }
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      const index = mockClients.findIndex((c) => c.id.toString() === id);
      if (index !== -1) {
        mockClients[index] = { ...mockClients[index], ...formData };
        console.log("✅ Zaktualizowano klienta:", mockClients[index]);
      }
    } else {
      const newClient = { id: Date.now(), ...formData };
      mockClients.push(newClient);
      console.log("✅ Dodano nowego klienta:", newClient);
    }

    navigate("/customers");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-4">{id ? "Edytuj klienta" : "Dodaj klienta"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input className="w-full border p-2" type="text" name="name" placeholder="Imię i nazwisko" value={formData.name} onChange={handleChange} required />
            <input className="w-full border p-2" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input className="w-full border p-2" type="tel" name="phone" placeholder="Telefon" value={formData.phone} onChange={handleChange} required />
            <input className="w-full border p-2" type="text" name="address" placeholder="Adres" value={formData.address} onChange={handleChange} />
            <textarea className="w-full border p-2" name="notes" placeholder="Notatki" rows={3} value={formData.notes} onChange={handleChange}></textarea>

            <div className="flex justify-between">
              <Button type="submit">{id ? "Zapisz zmiany" : "Dodaj klienta"}</Button>
              <Button variant="outline" type="button" onClick={() => navigate("/customers")}>Anuluj</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
