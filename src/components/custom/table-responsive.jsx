import React from 'react'

export function TableResponsive({ children, className = '' }) {
  return (
    <div className={`relative w-full overflow-auto ${className}`}>
      <div className="max-w-full overflow-x-auto">
        {children}
      </div>
    </div>
  )
}

