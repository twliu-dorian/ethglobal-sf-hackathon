import React from 'react';

interface ButtonProps {
  variant: 'text' | 'primary';
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, className = '', children }) => {
  const baseClasses = 'text-lg leading-none';
  const variantClasses = {
    text: 'text-indigo-600',
    primary: 'text-white bg-indigo-600 rounded-[100px]'
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;