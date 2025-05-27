export const fakeLogin = async (email: string, password: string) => {
    return new Promise<{ token: string }>((resolve, reject) => {
        setTimeout(() => {
            if (email === 'admin@crm.com' && password === 'admin123') {
                resolve({ token: 'fake-jwt-token' });
            } else {
                reject(new Error('Invalid credentials'));
            }
        }, 800);
    });
};
