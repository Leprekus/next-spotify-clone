import React, { type ReactNode } from 'react'

function Sidebar({ children }: { children : ReactNode }) {
  return (
    <div>{ children }</div>
  )
}

export default Sidebar