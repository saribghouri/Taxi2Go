import React from 'react';
import { motion } from 'framer-motion';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}
export const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-brand-black text-white hover:bg-gray-800 focus:ring-brand-black shadow-lg hover:shadow-xl',
    secondary: 'bg-brand-orange text-white hover:bg-brand-dark focus:ring-brand-orange shadow-orange hover:shadow-orange',
    outline: 'border-2 border-brand-black text-brand-black hover:bg-brand-black hover:text-white focus:ring-brand-black',
    white: 'bg-white text-brand-black hover:bg-gray-100 focus:ring-white shadow-lg'
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  return <motion.button whileHover={{
    scale: 1.05
  }} whileTap={{
    scale: 0.95
  }} className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `} {...props}>
      {children}
    </motion.button>;
};