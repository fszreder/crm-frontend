import { ClientList } from '@/pages/ClientList';
import CustomerDetail from './pages/CustomerDetail';
import CustomerForm from './pages/CustomerForm';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/homepage';
import { Login } from '@/pages/Login';
import { Toaster } from 'sonner';
import { useIdleLogout } from '@/hooks/useIdleLogout';
import { PrivateRoute } from '@/routes/PrivateRoute';

function App() {
    useIdleLogout();
    return (
        <div className="p-8">
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <HomePage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/homepage"
                    element={
                        <PrivateRoute>
                            <HomePage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/clientList"
                    element={
                        <PrivateRoute>
                            <ClientList />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/customers/new"
                    element={
                        <PrivateRoute>
                            <CustomerForm />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/customers/:id"
                    element={
                        <PrivateRoute>
                            <CustomerDetail />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/customers/:id/edit"
                    element={
                        <PrivateRoute>
                            <CustomerForm />
                        </PrivateRoute>
                    }
                />
            </Routes>
            <Toaster richColors position="top-right" closeButton />
        </div>
    );
}

export default App;
