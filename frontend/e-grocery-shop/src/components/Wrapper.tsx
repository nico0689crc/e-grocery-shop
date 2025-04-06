'use client'

import type { ReactNode } from 'react'
import { useEffect } from 'react'

const Wrapper = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    console.log('Wrapper')
  }, [])

  return <div className='flex flex-col min-h-screen'>{children}</div>
}

export default Wrapper
