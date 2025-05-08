import React from 'react';

const Heading = ({
  children,
  variant = 'h1',
  color = 'default',
  align = 'left',
  className = '',
}) => {
  const baseStyles = 'font-bold leading-tight';

  const variants = {
    h1: 'text-5xl md:text-6xl',
    h2: 'text-3xl md:text-4xl',
    h3: 'text-2xl md:text-3xl',
    h4: 'text-xl md:text-2xl',
    h5: 'text-lg md:text-xl',
    h6: 'text-base md:text-lg',
  };

  const colors = {
    default: 'text-gray-100',
    primary: 'text-[#6B21A8]',
    gradient: 'bg-gradient-to-r from-[#4C1D95] to-[#7E22CE] bg-clip-text text-transparent',
    light: 'text-gray-100',
    dark: 'text-[#581C87]',
  };

  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const headingStyles = `
    ${baseStyles}
    ${variants[variant]}
    ${colors[color]}
    ${alignments[align]}
    ${className}
  `;

  const Component = variant;

  return (
    <Component className={headingStyles}>
      {children}
    </Component>
  );
};

export default Heading;
