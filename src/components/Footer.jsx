import { useState, useEffect } from 'react';

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-company-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Srinistha Technology</h3>
            <p className="text-company-200 text-sm mt-1">Leave Management System</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-company-300 text-sm">
              &copy; {year} Srinistha Technology. All rights reserved.
            </p>
            <p className="text-company-400 text-xs mt-1">
              Version 1.0.0
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
