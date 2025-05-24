import { Routes, Route } from "react-router-dom";
import ClientsPage from "@/pages/ClientsPage";
import { ClientList } from "./components/ClientList";
import  CustomerDetail from "./pages/CustomerDetail";
import { CustomerForm } from "./pages/CustomerForm";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
   <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
      <Routes>
        <Route path="/clients" element={<ClientsPage />} />
        
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<ClientsPage />} />
          <Route path="/customers/new" element={<CustomerForm />} />
          <Route path="/customers/:id" element={<CustomerDetail />} />
          <Route path="/customers/:id/edit" element={<CustomerForm />} />
      </Routes>
    </div>
    </div>
  );
}

export default App;