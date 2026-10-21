import type { ReactNode } from 'react'
import './DeviceFrame.css'

/** A generic laptop drawn in CSS. Whatever you pass as children fills the screen. */
export function DeviceFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={['device', className].filter(Boolean).join(' ')} aria-hidden="true">
      <div className="device__lid">
        <div className="device__screen">{children}</div>
      </div>
      <div className="device__base" />
    </div>
  )
}
