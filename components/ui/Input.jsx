import React from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}
export const Input = ({
  label,
  icon,
  error,
  className = '',
  ...props
}: InputProps) => {
  return <div className="w-full">
      {label && <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">
          {label}
        </label>}
      <div className="relative group">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-orange transition-colors">
            {icon}
          </div>}
        <input className={`
            w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 
            ${icon ? 'pl-10' : 'pl-4'} pr-4
            text-gray-900 font-medium placeholder:text-gray-400
            focus:outline-none focus:border-brand-orange focus:ring-0
            transition-all duration-200
            ${error ? 'border-red-500' : ''}
            ${className}
          `} {...props} />
      </div>
      {error && <p className="mt-1 text-xs text-red-500 font-medium ml-1">{error}</p>}
    </div>;
};