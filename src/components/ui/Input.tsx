import React, { useState, forwardRef } from 'react'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'
import { cn } from '../../utils'
import type { InputProps } from '../../types'

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  placeholder,
  type = 'text',
  value,
  error,
  helperText,
  required = false,
  disabled = false,
  leftIcon,
  rightIcon,
  onChange,
  className = '',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type
  
  const baseStyles = 'w-full px-4 py-3 text-sm bg-white border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:bg-neutral-50 disabled:cursor-not-allowed'
  
  const borderStyles = error
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
    : isFocused
    ? 'border-primary-500 focus:border-primary-500 focus:ring-primary-500'
    : 'border-neutral-200 hover:border-neutral-300'
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value)
    }
  }
  
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="block text-sm font-medium text-neutral-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-neutral-400 w-5 h-5">
              {leftIcon}
            </div>
          </div>
        )}
        
        <input
          ref={ref}
          type={inputType}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            baseStyles,
            borderStyles,
            leftIcon && 'pl-10',
            (rightIcon || isPassword) && 'pr-10'
          )}
          {...props}
        />
        
        {(rightIcon || isPassword) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {isPassword ? (
              <button
                type="button"
                className="text-neutral-400 hover:text-neutral-600 w-5 h-5 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            ) : (
              <div className="text-neutral-400 w-5 h-5">
                {rightIcon}
              </div>
            )}
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <div className="flex items-start space-x-1">
          {error && (
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
          )}
          <p className={cn(
            'text-xs',
            error ? 'text-red-600' : 'text-neutral-500'
          )}>
            {error || helperText}
          </p>
        </div>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input