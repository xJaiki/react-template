// src/components/layout/MainLayout.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MessageSquare, BarChart2, Settings } from 'lucide-react';

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determina quale tab è attiva in base al percorso
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Area principale */}
      <main className="flex-1 overflow-auto pb-16">
        {children}
      </main>
      
      {/* Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center shadow-md">
        <div className="w-full flex justify-around">
          <button
            onClick={() => navigate('/chats')}
            className={`flex flex-col items-center justify-center w-full py-1 ${
              isActive('/chats') ? 'text-rose-600' : 'text-gray-600'
            }`}
          >
            <MessageSquare size={24} />
            <span className="text-xs mt-1">Chat</span>
          </button>
          
          <button
            onClick={() => navigate('/analytics')}
            className={`flex flex-col items-center justify-center w-full py-1 ${
              isActive('/analytics') ? 'text-rose-600' : 'text-gray-600'
            }`}
          >
            <BarChart2 size={24} />
            <span className="text-xs mt-1">Analisi</span>
          </button>
          
          <button
            onClick={() => navigate('/settings')}
            className={`flex flex-col items-center justify-center w-full py-1 ${
              isActive('/settings') ? 'text-rose-600' : 'text-gray-600'
            }`}
          >
            <Settings size={24} />
            <span className="text-xs mt-1">Impostazioni</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;