import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../utils'
import type { ButtonProps } from '../../types'

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative'
  
  const variants = {
    primary: 'bg-blue-900 text-white hover:bg-blue-800 focus:ring-blue-500 shadow-md hover:shadow-lg',
    secondary: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 shadow-md hover:shadow-lg',
    accent: 'bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-400 shadow-md hover:shadow-lg',
    outline: 'bg-transparent border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white focus:ring-blue-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md hover:shadow-lg',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-md hover:shadow-lg',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }
  
  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick()
    }
  }
  
  return (
    <button
      type={type}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        (disabled || loading) && 'cursor-not-allowed',
        className
      )}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      )}
      
      {!loading && leftIcon && (
        <span className="mr-2 flex items-center">{leftIcon}</span>
      )}
      
      <span>{children}</span>
      
      {!loading && rightIcon && (
        <span className="ml-2 flex items-center">{rightIcon}</span>
      )}
    </button>
  )
}

export default Button