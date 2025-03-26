// src/components/auth/EmailConfirmation.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase/client';

const EmailConfirmation = () => {
  const [message, setMessage] = useState('Verificando la conferma email...');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Controlla se c'è un errore nell'URL
    const hashParams = new URLSearchParams(location.hash.replace('#', ''));
    const errorParam = hashParams.get('error');
    const errorDescription = hashParams.get('error_description');
    
    if (errorParam) {
      setError(`Errore: ${errorDescription || errorParam}`);
      return;
    }

    // Prova ad aggiornare l'utente se c'è un token nell'URL
    const handleEmailConfirmation = async () => {
      try {
        // Supabase gestisce automaticamente il token nell'URL
        const { error } = await supabase.auth.refreshSession();
        
        if (error) {
          throw error;
        }
        
        setMessage('Email confermata con successo! Verrai reindirizzato...');
        
        // Reindirizza alla dashboard o alla login page dopo 2 secondi
        setTimeout(() => {
          navigate('/login', { 
            state: { message: 'Email confermata con successo! Ora puoi accedere.' } 
          });
        }, 2000);
      } catch (err) {
        console.error('Errore durante la conferma email:', err);
        setError('Si è verificato un errore durante la conferma email. Il link potrebbe essere scaduto o non valido.');
      }
    };

    handleEmailConfirmation();
  }, [navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Conferma Email
          </h2>
        </div>
        
        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <p className="text-center">{error}</p>
            <div className="mt-4 text-center">
              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
              >
                Torna al login
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
            <p className="text-center">{message}</p>
            <div className="mt-4 flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailConfirmation;