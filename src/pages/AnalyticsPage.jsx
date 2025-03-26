// src/pages/AnalyticsPage.jsx
import React from 'react';
import { BarChart, PieChart, Calendar } from 'lucide-react';

const AnalyticsPage = () => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm z-10">
        <h1 className="text-xl font-semibold text-gray-800">Analisi</h1>
      </div>
      
      {/* Vista temporanea */}
      <div className="flex flex-col items-center justify-center flex-1 p-4 text-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md">
          <div className="flex justify-center mb-4">
            <BarChart size={64} className="text-rose-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Analisi in arrivo</h2>
          <p className="text-gray-600">
            Questa sezione offrirà grafici dettagliati e analisi delle tue finanze personali.
          </p>
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center">
                <BarChart size={20} className="text-rose-600 mr-2" />
                <span className="text-gray-700">Grafici spese/entrate</span>
              </div>
              <div className="flex items-center">
                <PieChart size={20} className="text-rose-600 mr-2" />
                <span className="text-gray-700">Distribuzione per categoria</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Calendar size={20} className="text-rose-600 mr-2" />
              <span className="text-gray-700">Confronto periodi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;