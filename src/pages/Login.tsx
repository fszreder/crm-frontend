import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { login, register } from '@/lib/authService';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setError('');

        try {
            if (isRegistering) {
                await register(email, password);
                setIsRegistering(false);
                alert('Zarejestrowano! Teraz możesz się zalogować.');
            } else {
                const res = await login(email, password);
                localStorage.setItem('token', res.token);
                window.location.href = '/#/homepage';
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    setError(err.response.data?.error || 'Błąd logowania.');
                } else if (err.request) {
                    setError(
                        'Brak połączenia z serwerem. Sprawdź, czy backend i baza danych działają.'
                    );
                } else {
                    setError('Wystąpił problem z wysłaniem żądania.');
                }
            } else {
                setError('Nieznany błąd logowania.');
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center h-screen gap-4"
        >
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                <h1 className="text-2xl font-bold">
                    {isRegistering ? 'Rejestracja' : 'Logowanie'}
                </h1>

                <Input
                    className="w-72"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <div className="relative w-72">
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Hasło"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pr-10"
                    />
                    <button
                        type="button"
                        onMouseDown={() => setShowPassword(true)}
                        onMouseUp={() => setShowPassword(false)}
                        onMouseLeave={() => setShowPassword(false)}
                        className="absolute inset-y-0 right-2 flex items-center"
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <Button
                    className="w-72 cursor-pointer hover:bg-blue-600 hover:text-white"
                    variant="outline"
                    type="submit"
                >
                    {isRegistering ? 'Zarejestruj' : 'Zaloguj'}
                </Button>
            </form>

            <p
                className="text-sm text-blue-500 cursor-pointer"
                onClick={() => {
                    setError('');
                    setIsRegistering(!isRegistering);
                }}
            >
                {isRegistering ? 'Masz już konto? Zaloguj się' : 'Nie masz konta? Zarejestruj się'}
            </p>
        </motion.div>
    );
};
