import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";


export const ContactsContext = createContext()

export const ContactsProvider= ({children})=> {
  const [contacts, setContacts] = useLocalStorage('contacts', [])
  const createContact = (id, name)=>{
    setContacts(prevContacts => {
      return [...prevContacts, {id, name}]
    })
  }
  return (
    <ContactsContext.Provider value={{contacts, createContact}}>
      {children}
    </ContactsContext.Provider>
  )
}
