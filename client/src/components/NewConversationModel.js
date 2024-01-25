import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ContactsContext } from "../context/ContactsProvider";
import { ConversationsContext } from "../context/ConversationsProvider";

export default function NewConversationModel({ closeModal }) {
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const { contacts } = useContext(ContactsContext);
  const { createConversation } = useContext(ConversationsContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    createConversation(selectedContactIds);
    closeModal();
  };
  const handleCheckboxChange = (contactId) => {
    setSelectedContactIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter((prevId) => {
          return contactId !== prevId;
        });
      } else {
        return [...prevSelectedContactIds, contactId];
      }
    });
  };
  return (
    <div>
      <Modal.Header>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group
              controlId={contact.id}
              key={contact.id}
              className="mb-2"
            >
              <Form.Check
                type="checkbox"
                value={selectedContactIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type="submit" className="mr-2">
            Create
          </Button>
          <Button onClick={closeModal} type="submit" variant="secondary">
            Close
          </Button>
        </Form>
      </Modal.Body>
    </div>
  );
}
