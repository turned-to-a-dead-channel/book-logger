"use client";
import { createContext, useContext, useState } from 'react';

type ActiveModal = 'addBook' | 'logSession' | null;

const ModalContext = createContext<{
  activeModal: ActiveModal;
  setActiveModal: (m: ActiveModal) => void;
}>({ activeModal: null, setActiveModal: () => {} });

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [activeModal, setActiveModal] = useState<ActiveModal>(null);

    return (
        <ModalContext.Provider value={{ activeModal, setActiveModal }} >
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => useContext(ModalContext);
