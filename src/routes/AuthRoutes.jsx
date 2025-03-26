// src/routes/index.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Componenti di layout
import MainLayout from '../components/layout/MainLayout';

// Pagine pubbliche
import LandingPage from '../pages/LandingPage';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import ResetPassword from '../components/auth/ResetPassword';
import UpdatePassword from '../components/auth/UpdatePassword';
import EmailConfirmation from '../components/auth/EmailConfirmation';

// Pagine protette (richiedono autenticazione)
import ChatsListPage from '../pages/ChatListPage';
import ChatDetailPage from '../pages/ChatDetailPage';
import AnalyticsPage from '../pages/AnalyticsPage';
import SettingsPage from '../pages/SettingsPage';

// Componente per proteggere le rotte che richiedono autenticazione
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Mostra un indicatore di caricamento mentre si verifica l'autenticazione
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  // Reindirizza al login se l'utente non è autenticato
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Se l'utente è autenticato, mostra il contenuto della rotta
  return children;
};

// Componente per reindirizzare gli utenti già autenticati dalla pagina di login/landing
export const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Mostra un indicatore di caricamento mentre si verifica l'autenticazione
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  // Reindirizza alla dashboard se l'utente è già autenticato
  if (isAuthenticated) {
    return <Navigate to="/chats" />;
  }

  // Se l'utente non è autenticato, mostra il contenuto della rotta pubblica
  return children;
};

// Configurazione delle rotte
export const routes = [
  // Rotte pubbliche
  <Route 
    key="landing" 
    path="/" 
    element={
      <PublicRoute>
        <LandingPage />
      </PublicRoute>
    } 
  />,
  <Route 
    key="login" 
    path="/login" 
    element={
      <PublicRoute>
        <Login />
      </PublicRoute>
    } 
  />,
  <Route 
    key="register" 
    path="/register" 
    element={
      <PublicRoute>
        <Register />
      </PublicRoute>
    } 
  />,
  <Route 
    key="reset-password" 
    path="/reset-password" 
    element={
      <PublicRoute>
        <ResetPassword />
      </PublicRoute>
    } 
  />,
  <Route 
    key="update-password" 
    path="/update-password" 
    element={
      <PublicRoute>
        <UpdatePassword />
      </PublicRoute>
    } 
  />,
  <Route 
    key="confirm" 
    path="/confirm" 
    element={<EmailConfirmation />} 
  />,
  
  // Rotte protette
  <Route
    key="chats"
    path="/chats"
    element={
      <ProtectedRoute>
        <MainLayout>
          <ChatsListPage />
        </MainLayout>
      </ProtectedRoute>
    }
  />,
  <Route
    key="chat-detail"
    path="/chats/:monthId"
    element={
      <ProtectedRoute>
        <MainLayout>
          <ChatDetailPage />
        </MainLayout>
      </ProtectedRoute>
    }
  />,
  <Route
    key="analytics"
    path="/analytics"
    element={
      <ProtectedRoute>
        <MainLayout>
          <AnalyticsPage />
        </MainLayout>
      </ProtectedRoute>
    }
  />,
  <Route
    key="settings"
    path="/settings"
    element={
      <ProtectedRoute>
        <MainLayout>
          <SettingsPage />
        </MainLayout>
      </ProtectedRoute>
    }
  />,
  
  // Reindirizza da / a /chats se autenticato, o alla landing page se non autenticato
  <Route
    key="root-redirect"
    path="/"
    element={<Navigate to="/chats" replace />}
  />,
  
  // Pagina 404 - rotta wildcard
  <Route
    key="not-found"
    path="*"
    element={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Pagina non trovata</h2>
          <p className="text-gray-600 mb-6">
            La pagina che stai cercando non esiste o è stata spostata.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700"
          >
            Torna alla Home
          </button>
        </div>
      </div>
    }
  />
];