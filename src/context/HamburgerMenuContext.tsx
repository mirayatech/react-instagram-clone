import { useContext, createContext, useState } from 'react'

const HamburgerMenuContext = createContext({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => {},
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

export const MenuPopup = () => {
  return useContext(HamburgerMenuContext)
}
