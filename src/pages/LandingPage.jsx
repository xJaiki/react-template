// src/pages/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, BarChart2, ShieldCheck } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-5 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-rose-600 rounded-md flex items-center justify-center text-white font-bold">
              F
            </div>
            <span className="ml-2 text-xl font-semibold text-gray-800">FinChat</span>
          </div>
          <div>
            <button 
              className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 mr-2 hover:bg-gray-50"
              onClick={() => navigate('/login')}
            >
              Accedi
            </button>
            <button 
              className="py-2 px-4 bg-rose-600 rounded-md text-white hover:bg-rose-700"
              onClick={() => navigate('/register')}
            >
              Registrati
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Gestisci le tue finanze come una chat
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            FinChat rende il monitoraggio delle tue spese semplice e 
            intuitivo come inviare un messaggio.
          </p>
          <button 
            className="py-3 px-8 bg-rose-600 rounded-md text-white text-lg font-medium hover:bg-rose-700"
            onClick={() => navigate('/register')}
          >
            Inizia gratuitamente
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Semplice ma potente
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center p-3 bg-rose-100 rounded-full text-rose-600 mb-4">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Interfaccia a Chat</h3>
              <p className="text-gray-600">
                Visualizza le tue transazioni in modo cronologico,
                come in una conversazione.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center p-3 bg-rose-100 rounded-full text-rose-600 mb-4">
                <BarChart2 size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Analisi Dettagliate</h3>
              <p className="text-gray-600">
                Ottieni insight sulle tue abitudini di spesa con grafici
                e report intuitivi.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center p-3 bg-rose-100 rounded-full text-rose-600 mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sicuro e Privato</h3>
              <p className="text-gray-600">
                I tuoi dati finanziari sono sempre protetti e
                accessibili solo a te.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-rose-600 py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Pronto a prendere il controllo delle tue finanze?
          </h2>
          <button 
            className="py-3 px-8 bg-white rounded-md text-rose-600 text-lg font-medium hover:bg-gray-100"
            onClick={() => navigate('/register')}
          >
            Crea un account
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-8 w-8 bg-rose-600 rounded-md flex items-center justify-center text-white font-bold">
                F
              </div>
              <span className="ml-2 text-xl font-semibold">FinChat</span>
            </div>
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} FinChat. Tutti i diritti riservati.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;