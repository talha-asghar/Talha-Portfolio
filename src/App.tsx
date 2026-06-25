import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import PortfolioPage from './pages/PortfolioPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import type { ReactNode } from 'react';
import CursorFollower from './components/Cursorfollower';
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/admin" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    
    <ToastProvider>
      <PortfolioProvider>
        <AuthProvider>
          <CursorFollower />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PortfolioPage />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </PortfolioProvider>
    </ToastProvider>
  );
}
