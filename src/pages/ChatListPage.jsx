// src/pages/ChatsListPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Search, Calendar, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

// Questo sarà sostituito con chiamate reali all'API
const getDummyMonths = () => {
  const months = [];
  const currentDate = new Date();
  
  // Crea dati fittizi per 6 mesi precedenti
  for (let i = 0; i < 6; i++) {
    const date = new Date();
    date.setMonth(currentDate.getMonth() - i);
    
    const monthYear = format(date, 'yyyy-MM');
    const monthName = format(date, 'MMMM yyyy', { locale: it });
    
    // Calcola dati fittizi per entrate e uscite
    const expenses = Math.round(Math.random() * 1000 + 500);
    const income = Math.round(Math.random() * 1200 + 300);
    const balance = income - expenses;
    
    months.push({
      id: monthYear,
      name: monthName,
      expenses,
      income,
      balance,
      lastActivity: new Date(date.getFullYear(), date.getMonth(), Math.floor(Math.random() * 28) + 1)
    });
  }
  
  return months;
};

const ChatsListPage = () => {
  const [months, setMonths] = useState([]);
  const [selectedView, setSelectedView] = useState('months'); // 'months' o 'categories'
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Carica i mesi (simulando una chiamata API)
    setMonths(getDummyMonths());
  }, []);
  
  const handleChatSelect = (monthId) => {
    navigate(`/chats/${monthId}`);
  };
  
  // Filtra i mesi in base alla ricerca
  const filteredMonths = months.filter(month => 
    month.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-800">Le Tue Finanze</h1>
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-full text-rose-600"
            onClick={() => navigate('/transactions/new')}
          >
            <PlusCircle size={24} />
          </button>
        </div>
        
        {/* Search Box */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            placeholder="Cerca..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* View Selector */}
        <div className="flex mt-4 bg-gray-100 p-1 rounded-lg">
          <button
            className={`flex-1 py-2 text-center rounded-md ${
              selectedView === 'months' ? 'bg-white shadow-sm text-rose-600' : 'text-gray-600'
            }`}
            onClick={() => setSelectedView('months')}
          >
            <div className="flex items-center justify-center">
              <Calendar size={18} className="mr-1" />
              <span>Mesi</span>
            </div>
          </button>
          <button
            className={`flex-1 py-2 text-center rounded-md ${
              selectedView === 'categories' ? 'bg-white shadow-sm text-rose-600' : 'text-gray-600'
            }`}
            onClick={() => setSelectedView('categories')}
          >
            <div className="flex items-center justify-center">
              <Tag size={18} className="mr-1" />
              <span>Categorie</span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Chat List */}
      <div className="flex-1 overflow-auto">
        {selectedView === 'months' ? (
          <div className="divide-y divide-gray-200">
            {filteredMonths.length > 0 ? (
              filteredMonths.map(month => (
                <div 
                  key={month.id}
                  className="p-4 bg-white hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleChatSelect(month.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 capitalize">
                        {month.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Ultima attività: {format(month.lastActivity, 'd MMMM', { locale: it })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-medium ${month.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {month.balance.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}
                      </p>
                      <div className="flex justify-end space-x-2 text-xs">
                        <span className="text-green-600">
                          +{month.income.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}
                        </span>
                        <span className="text-red-600">
                          -{month.expenses.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-64 p-4 text-center">
                <p className="text-gray-600 mb-4">Nessun dato trovato per la tua ricerca</p>
                <button 
                  className="px-4 py-2 bg-rose-600 text-white rounded-md"
                  onClick={() => setSearchQuery('')}
                >
                  Mostra tutti
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 p-4 text-center">
            <p className="text-gray-600 mb-4">La vista per categorie sarà implementata in futuro</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatsListPage;