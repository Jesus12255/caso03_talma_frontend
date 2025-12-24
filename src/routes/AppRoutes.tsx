import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/features/auth/pages/LoginPage';
import ForgotPasswordPage from '@/features/auth/pages/ForgotPasswordPage';
import VerifyCodePage from '@/features/auth/pages/VerifyCodePage';
import ResetPasswordPage from '@/features/auth/pages/ResetPasswordPage';
import MainLayout from '@/layouts/MainLayout';
import CreateUser from '@/pages/users/CreateUser';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/verify-code" element={<VerifyCodePage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Main App Routes */}
            <Route element={<MainLayout />}>
                <Route path="/users/create" element={<CreateUser />} />
                {/* Fallback to /users/create for now as it's the only page */}
                <Route path="/" element={<Navigate to="/users/create" replace />} />
            </Route>

            {/* Global Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};

export default AppRoutes;
