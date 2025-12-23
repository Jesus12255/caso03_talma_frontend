import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import MainLayout from '@/layouts/MainLayout';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
