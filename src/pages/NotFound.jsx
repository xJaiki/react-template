import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-9xl font-extrabold text-rose-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          {t('notFound.title', '404 - Page Not Found')}
        </h2>
        <p className="text-lg text-gray-600 max-w-md mx-auto mb-8">
          {t('notFound.message', "Sorry, the page you are looking for doesn't exist or has been moved.")}
        </p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-rose-600 text-white font-medium rounded-md hover:bg-rose-700 transition-colors"
        >
          {t('notFound.backHome', 'Back to Home')}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;