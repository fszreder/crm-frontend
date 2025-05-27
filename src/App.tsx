import { Routes, Route } from 'react-router-dom';
import { HomePage } from './homepage';
import ClientsPage from '@/pages/ClientsPage';
import { Login } from './pages/Login';

function App() {
    return (
        <div className="p-8">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/clients" element={<ClientsPage />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
