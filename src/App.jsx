// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { routes } from './routes/AuthRoutes';
import ErrorBoundary from './pages/ErrorBoundary';
import ToastProvider from './components/ui/ToastProvider';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastProvider />
        <ErrorBoundary>
          <Routes>
            {routes}
          </Routes>
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
}

export default App;