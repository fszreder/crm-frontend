import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';

import { ClientList } from '@/pages/ClientList';
import CustomerDetail from './pages/CustomerDetail';
import CustomerForm from './pages/CustomerForm';
import { HomePage } from '@/pages/homepage';
import { Login } from '@/pages/Login';
import { useIdleLogout } from '@/hooks/useIdleLogout';
import { PrivateRoute } from '@/routes/PrivateRoute';
import { checkTokenValidity } from '@/lib/authService';

function App() {
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const navigate = useNavigate();

    useIdleLogout();

    useEffect(() => {
        const verifyToken = async () => {
            const isValid = await checkTokenValidity();
            if (!isValid) {
                localStorage.removeItem('token');
                navigate('login');
            }
            setIsAuthChecked(true);
        };

        verifyToken();
    }, [navigate]);

    if (!isAuthChecked) return null;

    return (
        <AnimatePresence mode="wait">
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
        </AnimatePresence>
    );
}

export default App;
