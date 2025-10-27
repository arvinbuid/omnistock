import { AccountSettings } from "@stackframe/stack";
import Sidebar from "../components/sidebar";

const Settings = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar currentPath="/settings" />

            <main className="ml-64 p-6">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
                            <p className="text-sm text-gray-500 mt-1">Manage your account settings and preferences.</p>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl">
                    <AccountSettings fullPage />
                </div>
            </main>
        </div>
    );
}

export default Settings;