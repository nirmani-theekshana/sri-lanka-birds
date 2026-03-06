import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import EndemicBirdsPage from './pages/EndemicBirdsPage';
import AboutBirdsPage from './pages/AboutBirdsPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
 
          {/* Protected routes — must be logged in */}
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/endemic-birds" element={<ProtectedRoute><EndemicBirdsPage /></ProtectedRoute>} />
          <Route path="/about-birds" element={<ProtectedRoute><AboutBirdsPage /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><ContactPage /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
 
export default App;

 
