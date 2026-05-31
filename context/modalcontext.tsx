"use client";
import { createContext, useContext, useState } from 'react';

const ModalContext = createContext({ isOpen: false, setIsOpen: (_: boolean) => {}});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <ModalContext.Provider value={{ isOpen, setIsOpen }} >
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => useContext(ModalContext);

