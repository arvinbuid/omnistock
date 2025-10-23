import { UserButton } from "@stackframe/stack";
import { BarChart3, Package, Plus, Settings } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
    currentPath: string;
}

const Sidebar = ({ currentPath = '/dashboard' }: SidebarProps) => {
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
    return (
        <div className="fixed left-0 top-0 min-h-screen text-white w-64 bg-gray-800 p-6 z-10">
            {/* Sidebar Logo */}
            <div className="mb-8">
                <div className="flex items-center mb-4 gap-2 px-2">
                    <BarChart3 className="w-6 h-6" />
                    <h1>OmniStock</h1>
                </div>
            </div>
            {/* Nav Links */}
            <nav className="space-y-1 px-2">
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
            <div className="absolute bottom-0 left-0 right-0 border-t border-gray-700 p-4 w-[calc(100%-32px)] mx-auto">
                <div className="flex items-center justify-between text-sm ">
                    <UserButton showUserInfo />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
