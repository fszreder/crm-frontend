import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const IDLE_TIMEOUT = 15 * 60 * 1000; // 15 min

export const useIdleLogout = () => {
    const navigate = useNavigate();
    const timeoutRef = useRef<number | null>(null);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        navigate('/login');
    }, [navigate]);

    const resetTimer = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(logout, IDLE_TIMEOUT);
    }, [logout]);

    useEffect(() => {
        const events: (keyof WindowEventMap)[] = [
            'mousemove',
            'keydown',
            'scroll',
            'click',
            'touchstart',
        ];

        events.forEach((event) => {
            window.addEventListener(event, resetTimer);
        });

        resetTimer();

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            events.forEach((event) => {
                window.removeEventListener(event, resetTimer);
            });
        };
    }, [resetTimer]);
};
