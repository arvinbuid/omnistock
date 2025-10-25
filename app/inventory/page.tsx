import Sidebar from "../components/sidebar";

const Inventory = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar currentPath="/inventory" />
        </div>
    );
}

export default Inventory;