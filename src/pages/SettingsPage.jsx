// src/pages/SettingsPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  CreditCard, 
  Tag, 
  Moon, 
  Bell, 
  HelpCircle, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  };
  
  const settingsGroups = [
    {
      title: 'Account',
      items: [
        {
          icon: <User size={20} />,
          label: 'Profilo',
          action: () => navigate('/settings/profile')
        }
      ]
    },
    {
      title: 'Personalizzazione',
      items: [
        {
          icon: <CreditCard size={20} />,
          label: 'Categorie',
          action: () => navigate('/settings/categories')
        },
        {
          icon: <Tag size={20} />,
          label: 'Tag',
          action: () => navigate('/settings/tags')
        },
        {
          icon: <Moon size={20} />,
          label: 'Tema',
          action: () => navigate('/settings/theme')
        },
        {
          icon: <Bell size={20} />,
          label: 'Notifiche',
          action: () => navigate('/settings/notifications')
        }
      ]
    },
    {
      title: 'Supporto',
      items: [
        {
          icon: <HelpCircle size={20} />,
          label: 'Aiuto',
          action: () => navigate('/settings/help')
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm z-10">
        <h1 className="text-xl font-semibold text-gray-800">Impostazioni</h1>
      </div>
      
      {/* Profilo utente */}
      <div className="bg-white p-4 mt-1 shadow-sm flex items-center">
        <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-bold">
          {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
        </div>
        <div className="ml-3 flex-1">
          <p className="font-medium text-gray-800">
            {user?.email || 'Utente'}
          </p>
          <p className="text-sm text-gray-500">
            {user?.username || user?.email || 'Account'}
          </p>
        </div>
      </div>
      
      {/* Lista impostazioni */}
      <div className="flex-1 overflow-auto mt-2">
        {settingsGroups.map((group, index) => (
          <div key={index} className="mb-4">
            <div className="px-4 py-2">
              <h2 className="text-sm font-medium text-gray-500">
                {group.title}
              </h2>
            </div>
            <div className="bg-white">
              {group.items.map((item, idx) => (
                <button
                  key={idx}
                  className="w-full flex items-center px-4 py-3 border-b border-gray-100 last:border-b-0"
                  onClick={item.action}
                >
                  <div className="text-gray-600 mr-3">{item.icon}</div>
                  <span className="flex-1 text-left text-gray-800">{item.label}</span>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Logout button */}
      <div className="p-4">
        <button
          className="w-full flex items-center justify-center py-3 bg-red-50 border border-red-100 rounded-lg text-red-600"
          onClick={handleLogout}
        >
          <LogOut size={18} className="mr-2" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;