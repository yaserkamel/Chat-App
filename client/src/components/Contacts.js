import React, { useContext } from 'react'
import { ContactsContext } from '../context/ContactsProvider'
import { ListGroup } from 'react-bootstrap'

export default function Contacts() {
  const {contacts} = useContext(ContactsContext)
  return (
    <ListGroup variant='flush'>
      {
        contacts.map(contact=>{
          return(
            <ListGroup.Item key={contact.id}>{contact.name}</ListGroup.Item>
          )
        })
      }
    </ListGroup>
  )
}
