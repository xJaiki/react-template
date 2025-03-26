// src/components/auth/Register.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validazione base
    if (!email || !password || !confirmPassword || !username) {
      setErrorMessage('Per favore, compila tutti i campi');
      return;
    }
    
    if (password !== confirmPassword) {
      setErrorMessage('Le password non corrispondono');
      return;
    }
    
    if (password.length < 6) {
      setErrorMessage('La password deve essere di almeno 6 caratteri');
      return;
    }
    
    try {
      setIsLoading(true);
      setErrorMessage('');
      
      const { error } = await register(email, password, username);
      
      if (error) {
        throw error;
      }
      
      // Registrazione riuscita, reindirizza al login
      navigate('/login', { 
        state: { 
          message: 'Registrazione completata con successo! Ora puoi accedere.' 
        } 
      });
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
      
      // Gestisci errori specifici di Supabase
      if (error.message.includes('email')) {
        setErrorMessage('Questa email è già registrata');
      } else if (error.message.includes('username')) {
        setErrorMessage('Questo username è già in uso');
      } else {
        setErrorMessage(
          error.message || 'Si è verificato un errore durante la registrazione. Riprova.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crea il tuo account
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}
          
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm"
                placeholder="Indirizzo Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Conferma Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm"
                placeholder="Conferma Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {isLoading ? 'Registrazione in corso...' : 'Registrati'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Hai già un account?{' '}
              <a href="/login" className="font-medium text-rose-600 hover:text-rose-500">
                Accedi
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;