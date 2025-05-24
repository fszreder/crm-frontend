import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      console.log("EDYTUJ klienta:", formData);
      // fetch(`/customers/${id}`, { method: 'PUT', body: JSON.stringify(formData) })
    } else {
      console.log("DODAJ klienta:", formData);
      // fetch(`/customers`, { method: 'POST', body: JSON.stringify(formData) })
    }
    navigate("/customers");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-4">{id ? "Edytuj klienta" : "Dodaj klienta"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="w-full border p-2"
              type="text"
              name="name"
              placeholder="Imię i nazwisko"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              className="w-full border p-2"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              className="w-full border p-2"
              type="tel"
              name="phone"
              placeholder="Telefon"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              className="w-full border p-2"
              type="text"
              name="address"
              placeholder="Adres"
              value={formData.address}
              onChange={handleChange}
            />
            <textarea
              className="w-full border p-2"
              name="notes"
              placeholder="Notatki"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
            ></textarea>

            <div className="flex justify-between">
              <Button type="submit">{id ? "Zapisz zmiany" : "Dodaj klienta"}</Button>
              <Button variant="outline" type="button" onClick={() => navigate("/customers")}>
                Anuluj
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
