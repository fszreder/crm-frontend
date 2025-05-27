import { ClientList } from '@/pages/ClientList';
import CustomerDetail from './pages/CustomerDetail';
import { CustomerForm } from './pages/CustomerForm';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/homepage';
import ClientsPage from '@/pages/ClientsPage';
import { Login } from '@/pages/Login';
import { ServiceList } from '@/pages/ServiceList';


function App() {
    return (
        <div className="p-8">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/clients" element={<ClientsPage />} />
                <Route path="/clientList" element={<ClientList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/customers" element={<ClientsPage />} />
                <Route path="/customers/new" element={<CustomerForm />} />
                <Route path="/customers/:id" element={<CustomerDetail />} />
                <Route path="/customers/:id/edit" element={<CustomerForm />} />
                <Route path="/ServiceList"  element={<ServiceList />}/>
            </Routes>
        </div>
    );
}

export default App;
