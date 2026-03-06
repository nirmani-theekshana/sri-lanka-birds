import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import EndemicBirdsPage from './pages/EndemicBirdsPage';
import AboutBirdsPage from './pages/AboutBirdsPage';
import ContactPage from './pages/ContactPage';

// DEBUG — paste this in browser console to see which is broken
console.log('LoginPage:', typeof LoginPage);
console.log('RegisterPage:', typeof RegisterPage);
console.log('HomePage:', typeof HomePage);
console.log('EndemicBirdsPage:', typeof EndemicBirdsPage);
console.log('AboutBirdsPage:', typeof AboutBirdsPage);
console.log('ContactPage:', typeof ContactPage);
console.log('ProtectedRoute:', typeof ProtectedRoute);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
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