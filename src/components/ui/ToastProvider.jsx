import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 5000,
        style: {
          background: '#fff',
          color: '#363636',
          border: '1px solid #e2e8f0',
          borderRadius: '0.375rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
        success: {
          duration: 3000,
          icon: '🎉',
          style: {
            borderLeft: '4px solid #10b981',
          },
        },
        error: {
          duration: 4000,
          icon: '❌',
          style: {
            borderLeft: '4px solid #ef4444',
          },
        },
        loading: {
          duration: Infinity,
        },
      }}
    />
  );
};

export default ToastProvider;