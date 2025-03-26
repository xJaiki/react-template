// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

// Recupera credenziali Supabase da variabili d'ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verifica che le credenziali siano presenti
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Credenziali Supabase mancanti. Assicurati di impostare VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY nel tuo .env'
  );
}

// Crea il client Supabase
export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
);