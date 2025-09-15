import React from 'react'
import { cn } from '../../utils'
import type { CardProps } from '../../types'

const Card: React.FC<CardProps> = ({
  variant = 'default',
  hover = false,
  padding = 'md',
  children,
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles = 'rounded-2xl transition-all duration-300'
  
  const variants = {
    default: 'bg-white border border-neutral-100 shadow-soft',
    outlined: 'bg-white border-2 border-neutral-200',
    elevated: 'bg-white shadow-medium',
    glass: 'glass border border-white/20',
  }
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }
  
  const hoverStyles = hover ? 'hover:shadow-medium hover:scale-[1.02] cursor-pointer' : ''
  
  return (
    <div
      className={cn(
        baseStyles,
        variants[variant],
        paddings[padding],
        hoverStyles,
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card