import React from 'react';
import { useTranslation } from 'react-i18next';

const I18nDemo = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            {t('i18nDemo.title', 'Internationalization Demo')}
                        </h1>
                    </div>

                    {/* Language selector */}
                    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-rose-600">
                            {t('i18nDemo.selectTitle', 'Select a language')}
                        </h2>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => changeLanguage('en')}
                                className={`px-4 py-2 rounded-md transition-colors ${i18n.language === 'en'
                                        ? 'bg-rose-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                🇬🇧 English
                            </button>
                            <button
                                onClick={() => changeLanguage('it')}
                                className={`px-4 py-2 rounded-md transition-colors ${i18n.language === 'it'
                                        ? 'bg-rose-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                🇮🇹 Italiano
                            </button>
                        </div>
                    </div>

                    {/* Translation examples */}
                    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-rose-600">
                            {t('i18nDemo.examplesTitle', 'Translation Examples')}
                        </h2>

                        <div className="space-y-6">
                            <div className="border-b pb-4">
                                <h3 className="font-medium text-gray-900 mb-2">
                                    {t('i18nDemo.greetingLabel', 'Greeting')}
                                </h3>
                                <p className="text-lg text-rose-600">
                                    {t('i18nDemo.greeting', 'Hello! Welcome to the i18n demo.')}
                                </p>
                            </div>

                            <div className="border-b pb-4">
                                <h3 className="font-medium text-gray-900 mb-2">
                                    {t('i18nDemo.dateTimeLabel', 'Date and Time Formatting')}
                                </h3>
                                <p className="text-lg text-rose-600">
                                    {t('i18nDemo.dateTime', 'Current date: {{date, datetime}}', {
                                        date: new Date(),
                                        formatParams: {
                                            date: { year: 'numeric', month: 'long', day: 'numeric' }
                                        }
                                    })}
                                </p>
                            </div>

                            <div className="border-b pb-4">
                                <h3 className="font-medium text-gray-900 mb-2">
                                    {t('i18nDemo.numbersLabel', 'Number Formatting')}
                                </h3>
                                <p className="text-lg text-rose-600">
                                    {t('i18nDemo.price', 'The price is {{price, number}}', {
                                        price: 1234.56,
                                        formatParams: {
                                            price: { style: 'currency', currency: 'EUR' }
                                        }
                                    })}
                                </p>
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-900 mb-2">
                                    {t('i18nDemo.pluralsLabel', 'Pluralization')}
                                </h3>
                                <p className="text-lg text-rose-600">
                                    {t('i18nDemo.items', 'You have {{count}} item', { count: 0 })}
                                </p>
                                <p className="text-lg text-rose-600">
                                    {t('i18nDemo.items', 'You have {{count}} item', { count: 1 })}
                                </p>
                                <p className="text-lg text-rose-600">
                                    {t('i18nDemo.items', 'You have {{count}} item', { count: 5 })}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default I18nDemo;