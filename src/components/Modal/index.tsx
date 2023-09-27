'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog'

interface ModalProps {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  headerContent?: React.ReactNode
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({
  isOpen = false,
  onOpenChange,
  children,
  className = '',
  headerContent
}) => {
  const [localIsOpen, setLocalIsOpen] = useState(isOpen)

  const handleOpenChange = (open: boolean) => {
    setLocalIsOpen(open)
    if (onOpenChange) {
      onOpenChange(open)
    }
  }

  return (
    <Dialog open={localIsOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={`sm:max-w-[425px] flex items-center justify-center ${className}`}
      >
        <DialogHeader onClick={() => handleOpenChange(false)}>
          {headerContent}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
