import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: '/apply', label: 'Apply Leave' },
    { path: '/policy', label: 'Leave Policy' },
    { path: '/status', label: 'Leave Status' },
    { path: '/report', label: 'Leave Report' },
    { path: '/application-process', label: 'Application Process' },
    { path: '/approval-process', label: 'Approval Process' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 shadow-lg transition-colors duration-200 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 font-bold text-xl tracking-tight">
            <span className="text-purple-600 dark:text-purple-400">Srinishtha</span>
            <span className="text-gray-700 dark:text-gray-300"> Technologies</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                    ${location.pathname === item.path 
                      ? (darkMode ? 'bg-purple-600 text-white' : 'bg-purple-500 text-white')
                      : (darkMode 
                          ? 'text-gray-300 hover:bg-purple-900 hover:text-white' 
                          : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600')}`}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-md transition-colors duration-200 ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-purple-50 text-purple-600 hover:bg-purple-100'}`}
              >
                {darkMode ? '🌞' : '🌙'}
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200 ${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-purple-50'}`}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${location.pathname === item.path 
                ? (darkMode ? 'bg-purple-600 text-white' : 'bg-purple-500 text-white')
                : (darkMode 
                    ? 'text-gray-300 hover:bg-purple-900 hover:text-white' 
                    : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600')}`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => {
              toggleTheme();
              setIsOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${darkMode ? 'text-gray-300 hover:bg-purple-900 hover:text-white' : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'}`}
          >
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;