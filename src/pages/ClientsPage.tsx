import { ClientList } from "@/components/ClientList";

const ClientsPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Lista klientów</h1>
      <ClientList />
    </div>
  );
};

export default ClientsPage;
