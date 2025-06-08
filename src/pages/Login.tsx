import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { login, register } from '@/lib/authService';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleSubmit = async () => {
        try {
            if (isRegistering) {
                await register(email, password);
                setIsRegistering(false);
                alert('Zarejestrowano! Teraz możesz się zalogować.');
            } else {
                const res = await login(email, password);
                localStorage.setItem('token', res.token);
                window.location.href = '/homepage';
            }
        } catch (err: unknown) {
            type ErrorWithResponse = {
                response?: {
                    data?: {
                        error?: string;
                    };
                };
            };
            if (
                err &&
                typeof err === 'object' &&
                'response' in err &&
                (err as ErrorWithResponse).response?.data?.error
            ) {
                setError((err as ErrorWithResponse).response!.data!.error!);
            } else {
                setError('Coś poszło nie tak');
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-2xl font-bold">{isRegistering ? 'Rejestracja' : 'Logowanie'}</h1>

            <Input
                className="w-72"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <Input
                className="w-72"
                type="password"
                placeholder="Hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500">{error}</p>}

            <Button
                className="w-72 cursor-pointer hover:bg-blue-600 hover:text-white"
                variant="outline"
                onClick={handleSubmit}
            >
                {isRegistering ? 'Zarejestruj' : 'Zaloguj'}
            </Button>

            <p
                className="text-sm text-blue-500 cursor-pointer"
                onClick={() => {
                    setError('');
                    setIsRegistering(!isRegistering);
                }}
            >
                {isRegistering ? 'Masz już konto? Zaloguj się' : 'Nie masz konta? Zarejestruj się'}
            </p>
        </div>
    );
};
