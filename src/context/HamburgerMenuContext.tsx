import type { Dispatch, SetStateAction } from 'react'

import React from 'react'
import { useContext, createContext, useState } from 'react'

type HamburgerMenuContextType = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const HamburgerMenuContext = createContext<HamburgerMenuContextType>({
  isOpen: false,
  setIsOpen: () => undefined,
})

export const HamburgerMenuContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <HamburgerMenuContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </HamburgerMenuContext.Provider>
  )
}

export const useHamburgerMenuContext = () => {
  return useContext(HamburgerMenuContext)
}
