import * as React from "react"

// DropdownMenu Context
interface DropdownContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const DropdownContext = React.createContext<DropdownContextType | undefined>(undefined)

// Main DropdownMenu Component
export function DropdownMenu({ children, onOpenChange }: { children: React.ReactNode; onOpenChange?: (open: boolean) => void }) {
  const [open, setOpen] = React.useState(false)
  
  React.useEffect(() => {
    if (onOpenChange) onOpenChange(open)
  }, [open, onOpenChange])

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

// DropdownMenuTrigger
export function DropdownMenuTrigger({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
  const context = React.useContext(DropdownContext)
  if (!context) throw new Error("DropdownMenuTrigger must be used within DropdownMenu")
  
  const handleClick = () => {
    context.setOpen(!context.open)
  }
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: handleClick,
    } as any)
  }
  
  return (
    <button onClick={handleClick}>
      {children}
    </button>
  )
}

// DropdownMenuContent
export function DropdownMenuContent({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  const context = React.useContext(DropdownContext)
  if (!context) throw new Error("DropdownMenuContent must be used within DropdownMenu")
  
  const contentRef = React.useRef<HTMLDivElement>(null)
  
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        context.setOpen(false)
      }
    }
    
    if (context.open) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [context.open])
  
  if (!context.open) return null
  
  return (
    <div
      ref={contentRef}
      className={`absolute right-0 mt-2 w-56 rounded-md border border-gray-200 bg-white shadow-lg z-50 ${className}`}
    >
      <div className="py-1">
        {children}
      </div>
    </div>
  )
}

// DropdownMenuItem
export function DropdownMenuItem({ 
  children, 
  onClick,
  className = "" 
}: { 
  children: React.ReactNode
  onClick?: () => void
  className?: string
}) {
  const context = React.useContext(DropdownContext)
  
  const handleClick = () => {
    if (onClick) onClick()
    if (context) context.setOpen(false)
  }
  
  return (
    <button
      onClick={handleClick}
      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer ${className}`}
    >
      {children}
    </button>
  )
}

// DropdownMenuLabel
export function DropdownMenuLabel({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <div className={`px-4 py-2 text-sm font-semibold text-gray-700 ${className}`}>
      {children}
    </div>
  )
}

// DropdownMenuSeparator
export function DropdownMenuSeparator({ className = "" }: { className?: string }) {
  return <div className={`my-1 h-px bg-gray-200 ${className}`} />
}

// DropdownMenuCheckboxItem
export function DropdownMenuCheckboxItem({ 
  children, 
  checked,
  onCheckedChange,
  className = "" 
}: { 
  children: React.ReactNode
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  className?: string
}) {
  const handleClick = () => {
    if (onCheckedChange) onCheckedChange(!checked)
  }
  
  return (
    <button
      onClick={handleClick}
      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer flex items-center ${className}`}
    >
      <span className="mr-2 w-4 h-4 border border-gray-300 rounded flex items-center justify-center">
        {checked && <span className="text-blue-600">✓</span>}
      </span>
      {children}
    </button>
  )
}

// DropdownMenuGroup
export function DropdownMenuGroup({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}