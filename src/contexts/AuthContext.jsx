// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

// Crea un contesto per l'autenticazione
const AuthContext = createContext(null);

// Hook personalizzato per utilizzare il contesto di autenticazione
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve essere utilizzato all\'interno di un AuthProvider');
  }
  return context;
};

/**
 * Provider del contesto di autenticazione
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Componenti figli
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effetto per caricare la sessione iniziale e configurare il listener
  useEffect(() => {
    // Funzione per caricare la sessione iniziale
    const loadInitialSession = async () => {
      try {
        setLoading(true);
        
        // Recupera la sessione corrente
        const { data, error } = await authService.getSession();
        
        if (error) {
          throw error;
        }
        
        // Imposta la sessione e l'utente se disponibili
        setSession(data.session);
        
        // Se c'è una sessione attiva, ottieni i dettagli dell'utente
        if (data.session) {
          const { data: userData, error: userError } = await authService.getCurrentUser();
          
          if (userError) {
            throw userError;
          }
          
          setUser(userData.user);
        }
        
        setError(null);
      } catch (err) {
        console.error('Errore nel caricamento della sessione:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Carica la sessione iniziale
    loadInitialSession();

    // Configura il listener per i cambiamenti di autenticazione
    const unsubscribe = authService.onAuthStateChange(async (event, session) => {
      setSession(session);
      
      // Aggiorna l'utente quando cambia lo stato di autenticazione
      if (session) {
        const { data, error } = await authService.getCurrentUser();
        if (!error && data) {
          setUser(data.user);
        }
      } else {
        setUser(null);
      }
      
      setLoading(false);
    });

    // Pulisci il listener quando il componente si smonta
    return unsubscribe;
  }, []);

  /**
   * Registra un nuovo utente
   * @param {string} email - Email dell'utente
   * @param {string} password - Password dell'utente
   * @param {string} username - Username dell'utente
   */
  const register = async (email, password, username) => {
    try {
      setLoading(true);
      const { data, error } = await authService.register(email, password, username);
      
      if (error) {
        throw error;
      }
      
      return { data, error: null };
    } catch (err) {
      console.error('Errore durante la registrazione:', err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Effettua il login di un utente
   * @param {string} email - Email dell'utente
   * @param {string} password - Password dell'utente
   */
  const login = async (email, password) => {
    try {
      setLoading(true);
      const { data, error } = await authService.login(email, password);
      
      if (error) {
        throw error;
      }
      
      return { data, error: null };
    } catch (err) {
      console.error('Errore durante il login:', err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Effettua il logout dell'utente corrente
   */
  const logout = async () => {
    try {
      setLoading(true);
      const { error } = await authService.logout();
      
      if (error) {
        throw error;
      }
      
      // Resetta lo stato locale
      setUser(null);
      setSession(null);
      
      return { error: null };
    } catch (err) {
      console.error('Errore durante il logout:', err);
      return { error: err };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Invia un'email per il reset della password
   * @param {string} email - Email dell'utente
   */
  const resetPassword = async (email) => {
    return await authService.resetPassword(email);
  };

  /**
   * Aggiorna la password dell'utente
   * @param {string} newPassword - Nuova password
   */
  const updatePassword = async (newPassword) => {
    return await authService.updatePassword(newPassword);
  };

  // Valore del contesto
  const value = {
    user,
    session,
    loading,
    error,
    register,
    login,
    logout,
    resetPassword,
    updatePassword,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;