import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const IDLE_TIMEOUT = 15 * 60 * 1000;

export const useIdleLogout = () => {
    const navigate = useNavigate();
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        const resetTimer = () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = window.setTimeout(() => {
                localStorage.removeItem('token');
                navigate('/login');
            }, IDLE_TIMEOUT);
        };

        const events = ['mousemove', 'keydown', 'scroll', 'click'];

        events.forEach((event) => {
            window.addEventListener(event, resetTimer);
        });

        resetTimer();

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            events.forEach((event) => {
                window.removeEventListener(event, resetTimer);
            });
        };
    }, [navigate]);
};
