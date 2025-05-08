import React from 'react';
import { Link } from 'react-router-dom';

export { Button };

const Button = ({
  text,
  variant = 'primary',
  size = 'medium',
  to,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  fullWidth = false,
  children,
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-300';
  
  const variants = {
    primary: 'bg-[#6B21A8] text-white hover:bg-[#581C87] active:bg-[#4C1D95] shadow-sm',
    secondary: 'bg-gray-800 text-gray-100 hover:bg-gray-700 active:bg-gray-600',
    outline: 'border border-[#6B21A8] text-[#6B21A8] hover:bg-[#6B21A8] hover:text-white',
    gradient: 'bg-gradient-to-r from-[#6B21A8] to-[#7E22CE] text-white hover:opacity-90',
    ghost: 'text-[#6B21A8] hover:bg-[#6B21A8]/20',
    light: 'bg-[#581C87]/10 text-[#6B21A8] hover:bg-[#581C87]/20 active:bg-[#581C87]/30',
  };

  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-2.5 text-lg',
  };

  const buttonStyles = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;

  if (to) {
    return (
      <Link to={to} className={buttonStyles}>
        {text}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonStyles}
    >
      {text || children}
    </button>
  );
};