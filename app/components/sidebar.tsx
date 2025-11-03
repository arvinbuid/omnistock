'use client'

import { UserButton } from "@stackframe/stack";
import { BarChart3, Package, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { useSidebar } from "../context/SidebarContext";

interface SidebarProps {
    currentPath: string;
}

const navLinks = [
    {
        name: 'Dashboard',
        href: '/dashboard',
        icon: BarChart3
    },
    {
        name: 'Inventory',
        href: '/inventory',
        icon: Package
    },
    {
        name: 'Add New Product',
        href: '/add-product',
        icon: Plus
    },
    {
        name: 'Settings',
        href: '/settings',
        icon: Settings
    },
]

const Sidebar = ({ currentPath = '/dashboard' }: SidebarProps) => {
    const { isOpen, toggleSidebar } = useSidebar();

    return (
        <div className={`fixed top-0 min-h-screen text-white bg-gray-800 p-6 z-10 transition-all duration-300 ${isOpen ? 'w-64 left-0' : 'w-64 -left-49'}`}>
            {/* Sidebar Logo */}
            <div className="mb-8 mt-3">
                <div className="flex items-center gap-2 px-2 relative">
                    <BarChart3 className={`w-6 h-6 transition-opacity duration-100 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
                    <h1 className={`transition-opacity duration-100 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>OmniStock</h1>
                    <span
                        onClick={toggleSidebar}
                        className="rotate-45 text-2xl absolute -top-3.5 right-0 cursor-pointer"
                    >
                        +
                    </span>
                </div>
            </div>
            {/* Nav Links */}
            <nav className={`space-y-1 px-2  transition-opacity duration-100 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                <div className="text-xs uppercase text-gray-400 font-semibold">Inventory</div>
                <ul className="text-sm space-y-1 mt-5">
                    {navLinks.map((link, index) => {
                        const LinkComponent = link.icon;
                        const isActive = currentPath === link.href;
                        return (
                            <li key={index}>
                                <Link href={link.href} className={`flex items-center gap-2 px-3 py-2 rounded-md ${isActive ? 'bg-gray-100 text-gray-800' : 'text-gray-300 hover:bg-gray-700/50 hover:text-gray-300'}`}>
                                    <LinkComponent className="w-4 h-4" />
                                    <span>{link.name}</span>
                                </Link>
                            </li>
                        )
                    }
                    )}
                </ul>
            </nav>
            {/* Sidebar Footer */}
            <div className={`absolute bottom-0 left-0 right-0 border-t border-gray-700 p-4 w-[calc(100%-32px)] mx-auto transition-opacity duration-100 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex items-center justify-between text-sm ">
                    <UserButton showUserInfo />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
