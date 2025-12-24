import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const MainLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    return (
        <div className="min-h-screen bg-tivit-dark text-gray-100 font-sans selection:bg-tivit-red/30 flex flex-col">
            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-tivit-red/5 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-tivit-red/5 rounded-full blur-[128px]" />
            </div>

            {/* Header (Full Width) */}
            <Header onMenuClick={() => setIsSidebarOpen(true)} />

            {/* Main Layout Body */}
            <div className="flex flex-1 pt-16"> {/* pt-16 to account for fixed header height */}
                {/* Sidebar */}
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

                {/* Main Content */}
                <div className="flex-1 w-full lg:ml-64 relative z-10 p-4 lg:p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
