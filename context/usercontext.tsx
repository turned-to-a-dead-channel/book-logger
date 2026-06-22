"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext<{
  user: any;
  isLoading: boolean;
}>({ user: null, isLoading: true});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/users')
            .then(res => res.json())
            .then(data => {
                setUser(data)
            })
        .finally(() => setIsLoading(false))
    }, []);

    return (
        <UserContext.Provider value={{ user, isLoading }} >
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);