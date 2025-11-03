'use client'

import { createContext, ReactNode, useContext, useState } from "react";

interface SidebarContext {
    isOpen: boolean;
    toggleSidebar: () => void
}

export const SidebarContext = createContext<SidebarContext | undefined>(undefined)

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(true);
    const toggleSidebar = () => setIsOpen(prev => !prev);
    return (
        <SidebarContext.Provider value={{
            isOpen,
            toggleSidebar
        }}>
            {children}
        </SidebarContext.Provider>
    )
}

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) throw new Error("useSidebar must be used within a SidebarProvider");
    return context
}