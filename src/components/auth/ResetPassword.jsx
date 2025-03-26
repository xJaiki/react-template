// src/components/auth/ResetPassword.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setErrorMessage('Per favore, inserisci la tua email');
      return;
    }
    
    try {
      setIsLoading(true);
      setErrorMessage('');
      setMessage('');
      
      const { error } = await resetPassword(email);
      
      if (error) {
        throw error;
      }
      
      // Richiesta inviata con successo
      setMessage(
        'Abbiamo inviato un\'email con le istruzioni per reimpostare la password. Controlla la tua casella di posta.'
      );
    } catch (error) {
      console.error('Errore durante la richiesta di reset password:', error);
      setErrorMessage(
        error.message || 'Si è verificato un errore durante la richiesta. Riprova.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reimposta la tua password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Inserisci la tua email e ti invieremo le istruzioni per reimpostare la password.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}
          
          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{message}</span>
            </div>
          )}
          
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Indirizzo Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm"
                placeholder="Indirizzo Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Invio in corso...' : 'Invia istruzioni'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              <a href="/login" className="font-medium text-rose-600 hover:text-rose-500">
                Torna al login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;