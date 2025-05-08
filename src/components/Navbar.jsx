import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Heading from "./ui/heading";

// Remove Button import since it's no longer needed

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Add these functions near the other handlers
  const handleMouseEnter = (index) => setActiveDropdown(index);
  const handleMouseLeave = () => setActiveDropdown(null);  // Add this line
  
  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      label: "Apply for Leave",
      path: "/apply",
      children: [
        { path: "/application-process", label: "Application Process" },
        { path: "/approval-process", label: "Approval Process" },
      ],
    },
    { path: "/policy", label: "Leave Policy" },
    { path: "/status", label: "Leave Status" },
    { path: "/report", label: "Leave Report" },
  ];

  // Add this function to handle smooth scrolling
  const handleNavigation = (e, path) => {
    if (path.startsWith('/#')) {
      e.preventDefault();
      const element = document.getElementById(path.substring(2));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Update the Link component in the non-dropdown items
  return (
    <header className={`fixed w-full top-0 z-50 ${isScrolled ? 'bg-white/90' : 'bg-white'} backdrop-blur-sm shadow-lg`}>
      <nav className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <Heading
              variant="h2"
              color="primary"
              className="transform transition-transform group-hover:scale-105"
            >
              Srinistha Technology
            </Heading>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div
                key={item.path || index}
                className="relative group"
                onMouseEnter={() => item.children && handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {item.children ? (
                  <div className="flex items-center">
                    <div
                      className="cursor-pointer mr-1 pb-0.5 relative text-gray-700 hover:text-gray-900"
                      onClick={() => handleDropdownNavigation(item.path)}
                    >
                      <span className="font-medium">{item.label}</span>
                      <span
                        className={`absolute inset-x-0 bottom-0 h-0.5 bg-[#6B21A8] transform transition-transform duration-300 ${
                          item.children.some(child => location.pathname.includes(child.path.split('#')[0]))
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      ></span>
                    </div>
                    <div
                      onClick={(e) => handleDropdownToggle(index, e)}
                      className="cursor-pointer"
                    >
                      <svg
                        className={`w-4 h-4 mt-1 transition-transform duration-200 text-gray-700 ${
                          activeDropdown === index ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    {activeDropdown === index && (
                      <div 
                        className="absolute top-full left-0 w-48 bg-white rounded-md shadow-lg py-2 mt-0.5 overflow-hidden"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 border-l-4 border-transparent hover:border-[#6B21A8] transition-all duration-200 items-center"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className="transform transition-transform duration-200 inline-block hover:translate-x-2">
                              {child.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    onClick={(e) => handleNavigation(e, item.path)}
                    className="relative font-medium transition-colors duration-300 pb-1 text-gray-700 hover:text-gray-900"
                  >
                    {item.label}
                    <span
                      className={`absolute inset-x-0 bottom-0 h-0.5 bg-[#6B21A8] transform transition-transform duration-300 ${
                        location.pathname + location.hash === item.path
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    ></span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Remove Contact Button section */}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <span
                className={`block h-0.5 w-6 bg-[#6B21A8] transform transition-transform duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-[#6B21A8] transition-opacity duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-[#6B21A8] transform transition-transform duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-200">
              <div className="flex flex-col space-y-4 p-6">
                {navItems.map((item, index) => (
                  <div key={item.path || index}>
                    {item.children ? (
                      <>
                        <div className="flex items-center justify-between">
                          <div
                            className={`text-lg font-medium cursor-pointer relative ${
                              item.children.some(child => location.pathname.includes(child.path.split('#')[0]))
                                ? 'text-[#6B21A8]'
                                : 'text-gray-700 hover:text-[#6B21A8]'
                            } transition-colors duration-300`}
                            onClick={() => handleDropdownNavigation(item.path)}
                          >
                            {item.label}
                          </div>
                          <div 
                            onClick={(e) => handleDropdownToggle(index, e)}
                            className="cursor-pointer p-2"
                          >
                            <svg
                              className={`w-4 h-4 transition-transform duration-200 ${
                                activeDropdown === index ? "rotate-180" : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </div>
                        {activeDropdown === index && (
                          <div className="ml-4 mt-2 space-y-2">
                            {item.children.map((child) => (
                              <Link
                                key={child.path}
                                to={child.path}
                                className={`block text-base transform transition-all duration-200 hover:translate-x-2 ${
                                  location.pathname.includes(child.path.split('#')[0])
                                    ? 'text-[#6B21A8] font-medium'
                                    : 'text-gray-600 hover:text-[#6B21A8]'
                                }`}
                                onClick={() => {
                                  setActiveDropdown(null);
                                  setIsMenuOpen(false);
                                }}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        to={item.path}
                        className={`text-lg font-medium transform hover:translate-x-2 transition-all duration-300 ${
                          location.pathname === item.path
                            ? 'text-[#6B21A8]'
                            : 'text-gray-700 hover:text-[#6B21A8]'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;