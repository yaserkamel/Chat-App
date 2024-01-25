import { createContext, useCallback, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { ContactsContext } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";

export const ConversationsContext = createContext();

export const ConversationsProvider = ({ id, children }) => {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contacts } = useContext(ContactsContext);
  const socket = useSocket()

  const createConversation = (recipients) => {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  };

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((rec) => {
      const contact = contacts.find((contact) => {
        return contact.id === rec;
      });
      const name = (contact && contact.name) || rec;
      return { id: rec, name };
    });

    const messages = conversation.messages.map(message=>{
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });
      const name = (contact && contact.name) || message.sender;
      const fromMe = id === message.sender
      return {...message, senderName: name, fromMe}
    })
    const selected = index === selectedConversationIndex;
    return { ...conversation,messages, recipients, selected };
  });
  console.log(formattedConversations);

  const addMessageToConversation = useCallback(({ recipients, text, sender }) => {
    setConversations((prevConversations) => {
      let madeChange = false;
      const newMessage = { sender, text };
      const newConversations = prevConversations.map(conversation=>{
        if(arrayEquality(conversation.recipients, recipients)){
          madeChange = true
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage]
          }
        }
        return conversation
      })

      if (madeChange) {
        return newConversations
      } else {
        return [...prevConversations, { recipients, messages: [newMessage] }];
      }
    });
  },[setConversations]);

  useEffect(()=>{
    if(socket == null) return 
    socket.on('receive-message', addMessageToConversation)
    return ()=> socket.off('receive-message')
  }, [socket, addMessageToConversation])

  const sendMessage = (recipients, text) => {
    socket.emit('send-message', {recipients, text})
    addMessageToConversation({ recipients, text, sender: id });
  };

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    createConversation,
  };
  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};


const arrayEquality = (a,b)=>{
  if(a.length !== b.length) return false
  a.sort()
  b.sort()

  return a.every((element, index)=>{
    return element === b[index]
  })
}