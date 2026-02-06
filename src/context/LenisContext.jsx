import { createContext, useContext, useRef, useCallback } from 'react'

const LenisContext = createContext(null)

export function LenisProvider({ children, lenisRef }) {
  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  )
}

export function useLenis() {
  const lenisRef = useContext(LenisContext)
  const scrollTo = useCallback(
    (target, options = {}) => {
      if (lenisRef?.current) {
        lenisRef.current.scrollTo(target, { lerp: 0.1, ...options })
      } else {
        if (typeof target === 'number') {
          window.scrollTo({ top: target, behavior: 'smooth' })
        } else if (typeof target === 'string') {
          const el = document.querySelector(target)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }
      }
    },
    [lenisRef]
  )
  return { scrollTo, lenis: lenisRef?.current }
}
