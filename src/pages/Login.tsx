import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { fakeLogin } from '@/lib/api';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const res = await fakeLogin(email, password);
            localStorage.setItem('token', res.token);
            window.location.href = '/homepage';
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Something went wrong');
            }
        }
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-2xl font-bold">Login</h1>

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
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500">{error}</p>}

            <Button
                className="w-72 hover:bg-gray-600 hover:text-white cursor-pointer transition-colors flex items-center gap-2"
                onClick={handleLogin}
            >
                Log in
            </Button>
        </div>
    );
};
