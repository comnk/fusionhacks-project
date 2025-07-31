import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="absolute top-4 right-4 z-50">
            <select
            onChange={(e) => changeLanguage(e.target.value)}
            value={i18n.language}
            className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2 text-sm shadow-md hover:shadow-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <option value="en">🇺🇸 English</option>
            <option value="es">🇪🇸 Español</option>
            {/* Add more languages as needed */}
            </select>
        </div>
    );
};

export default LanguageSwitcher;
