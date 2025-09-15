import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  children: React.ReactNode
  className?: string
  closeOnBackdrop?: boolean
  showCloseButton?: boolean
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  children,
  className = '',
  closeOnBackdrop = true,
  showCloseButton = true,
}) => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  }
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
  
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])
  
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnBackdrop) {
      onClose()
    }
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex min-h-full items-center justify-center p-4"
            onClick={handleBackdropClick}
          >
            {/* Backdrop */}
            <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm" />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'relative w-full bg-white rounded-2xl shadow-strong',
                sizes[size],
                className
              )}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex items-center justify-between p-6 border-b border-neutral-100">
                  {title && (
                    <h2 className="text-xl font-heading font-semibold text-neutral-900">
                      {title}
                    </h2>
                  )}
                  
                  {showCloseButton && (
                    <button
                      type="button"
                      className="ml-auto p-2 text-neutral-400 hover:text-neutral-600 rounded-lg hover:bg-neutral-100 transition-colors"
                      onClick={onClose}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              )}
              
              {/* Content */}
              <div className={cn(
                'p-6',
                !(title || showCloseButton) && 'pt-6'
              )}>
                {children}
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default Modal
