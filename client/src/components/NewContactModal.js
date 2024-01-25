import React, { useContext, useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { ContactsContext } from '../context/ContactsProvider'

export default function NewContactModal({closeModal}) {
  const idRef = useRef()
  const nameRef = useRef()

  const {createContact} = useContext(ContactsContext)
  const handleSubmit = (e)=>{
    e.preventDefault()
    createContact(idRef.current.value, nameRef.current.value)
    closeModal()
  }
  return (
    <div>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control type='text' ref={idRef} required/>
          </Form.Group>
          <Form.Group  className='mb-2'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' ref={nameRef} required/>
          </Form.Group>
          <Button type='submit' className='mr-2'>Create</Button>
          <Button onClick={closeModal} type='submit' variant='secondary'>Close</Button>
        </Form>
      </Modal.Body>
    </div>
  )
}
