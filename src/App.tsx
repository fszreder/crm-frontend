import { Routes, Route } from "react-router-dom";
import ClientsPage from "@/pages/ClientsPage";
import { ClientList } from "./components/ClientList";

function App() {
  return (
    <div className="p-8">
      <ClientList />
      <Routes>
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/" element={<div className="p-4">Dashboard (Wkrótce)</div>} />
      </Routes>
    </div>
  );
}

export default App;