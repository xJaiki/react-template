// src/services/authService.js
import { supabase } from '../lib/supabase/client';

/**
 * Servizio per gestire l'autenticazione con Supabase
 */
const authService = {
  /**
   * Registra un nuovo utente
   * @param {string} email - Email dell'utente
   * @param {string} password - Password dell'utente
   * @param {string} username - Nome utente
   * @returns {Promise<{data, error}>} Risultato dell'operazione
   */
  register: async (email, password, username) => {
    try {
      // 1. Registra l'utente con Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      // 2. Se la registrazione ha successo, crea un profilo utente personalizzato
      if (authData?.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: authData.user.id,
              username,
              email,
            },
          ]);

        if (profileError) throw profileError;
      }

      return { data: authData, error: null };
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
      return { data: null, error };
    }
  },

  /**
   * Effettua il login di un utente
   * @param {string} email - Email dell'utente
   * @param {string} password - Password dell'utente
   * @returns {Promise<{data, error}>} Risultato dell'operazione
   */
  login: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return { data, error };
    } catch (error) {
      console.error('Errore durante il login:', error);
      return { data: null, error };
    }
  },

  /**
   * Effettua il logout dell'utente corrente
   * @returns {Promise<{error}>} Risultato dell'operazione
   */
  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      console.error('Errore durante il logout:', error);
      return { error };
    }
  },

  /**
   * Ottieni la sessione utente corrente
   * @returns {Promise<{data, error}>} Sessione utente
   */
  getSession: async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      return { data, error };
    } catch (error) {
      console.error('Errore nel recupero della sessione:', error);
      return { data: null, error };
    }
  },

  /**
   * Ottieni l'utente corrente
   * @returns {Promise<{data, error}>} Dati utente
   */
  getCurrentUser: async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      return { data, error };
    } catch (error) {
      console.error('Errore nel recupero dell\'utente corrente:', error);
      return { data: null, error };
    }
  },

  /**
   * Invia un'email per il reset della password
   * @param {string} email - Email dell'utente
   * @returns {Promise<{data, error}>} Risultato dell'operazione
   */
  resetPassword: async (email) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      return { data, error };
    } catch (error) {
      console.error('Errore nella richiesta di reset password:', error);
      return { data: null, error };
    }
  },

  /**
   * Aggiorna la password dell'utente
   * @param {string} newPassword - Nuova password
   * @returns {Promise<{data, error}>} Risultato dell'operazione
   */
  updatePassword: async (newPassword) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      return { data, error };
    } catch (error) {
      console.error('Errore nell\'aggiornamento della password:', error);
      return { data: null, error };
    }
  },

  /**
   * Configura un ascoltatore per i cambiamenti dello stato di autenticazione
   * @param {Function} callback - Funzione da chiamare quando lo stato di autenticazione cambia
   * @returns {Function} Funzione per rimuovere l'ascoltatore
   */
  onAuthStateChange: (callback) => {
    const { data } = supabase.auth.onAuthStateChange(callback);
    return () => {
      if (data && data.subscription && data.subscription.unsubscribe) {
        data.subscription.unsubscribe();
      }
    };
  }
};

export default authService;
