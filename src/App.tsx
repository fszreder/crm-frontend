import { ClientList } from '@/pages/ClientList';
import CustomerDetail from './pages/CustomerDetail';
import CustomerForm from './pages/CustomerForm';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/homepage';
import { Login } from '@/pages/Login';
import { ServiceList } from '@/pages/ServiceList';
import { Toaster } from 'sonner';

function App() {
    return (
        <div className="p-8">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/clientList" element={<ClientList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/customers/new" element={<CustomerForm />} />
                <Route path="/customers/:id" element={<CustomerDetail />} />
                <Route path="/customers/:id/edit" element={<CustomerForm />} />
                <Route path="/ServiceList"  element={<ServiceList />}/>
            </Routes>
            <Toaster richColors position="top-right" closeButton />
        </div>
    );
}

export default App;
