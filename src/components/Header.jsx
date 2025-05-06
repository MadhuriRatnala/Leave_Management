import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';

const Header = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300",
      scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className={cn(
              "font-bold text-2xl transition-colors",
              scrolled ? "text-company-800" : "text-company-700"
            )}>
              Srinistha Technology
            </h1>
            <span className="text-company-600 ml-2 hidden md:inline">Leave Management System</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => onNavigate('application')} 
              className="text-company-700 hover:text-company-900 font-medium"
            >
              Apply for Leave
            </button>
            <button 
              onClick={() => onNavigate('policy')} 
              className="text-company-700 hover:text-company-900 font-medium"
            >
              Leave Policy
            </button>
            <button 
              onClick={() => onNavigate('applicationFlow')} 
              className="text-company-700 hover:text-company-900 font-medium"
            >
              Application Process
            </button>
            <button 
              onClick={() => onNavigate('approvalFlow')} 
              className="text-company-700 hover:text-company-900 font-medium"
            >
              Approval Process
            </button>
            <button 
              onClick={() => onNavigate('status')} 
              className="text-company-700 hover:text-company-900 font-medium"
            >
              Leave Status
            </button>
            <button 
              onClick={() => onNavigate('report')} 
              className="text-company-700 hover:text-company-900 font-medium"
            >
              Leave Report
            </button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center text-company-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => {
                  onNavigate('application');
                  setMobileMenuOpen(false);
                }} 
                className="text-company-700 hover:text-company-900 font-medium py-2"
              >
                Apply for Leave
              </button>
              <button 
                onClick={() => {
                  onNavigate('policy');
                  setMobileMenuOpen(false);
                }} 
                className="text-company-700 hover:text-company-900 font-medium py-2"
              >
                Leave Policy
              </button>
              <button 
                onClick={() => {
                  onNavigate('applicationFlow');
                  setMobileMenuOpen(false);
                }} 
                className="text-company-700 hover:text-company-900 font-medium py-2"
              >
                Application Process
              </button>
              <button 
                onClick={() => {
                  onNavigate('approvalFlow');
                  setMobileMenuOpen(false);
                }} 
                className="text-company-700 hover:text-company-900 font-medium py-2"
              >
                Approval Process
              </button>
              <button 
                onClick={() => {
                  onNavigate('status');
                  setMobileMenuOpen(false);
                }} 
                className="text-company-700 hover:text-company-900 font-medium py-2"
              >
                Leave Status
              </button>
              <button 
                onClick={() => {
                  onNavigate('report');
                  setMobileMenuOpen(false);
                }} 
                className="text-company-700 hover:text-company-900 font-medium py-2"
              >
                Report
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
