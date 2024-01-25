import React, { useContext } from "react";
import { ConversationsContext } from "../context/ConversationsProvider";
import { ListGroup } from "react-bootstrap";

export default function Conversations() {
  const { conversations, selectConversationIndex } =
    useContext(ConversationsContext);
    // console.log(conversations) 
  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => (
        <ListGroup.Item
          key={index}
          action
          onClick={() => selectConversationIndex(index)}
          active={conversation.selected}
        >
          {" "}
          {conversation.recipients.map((rec) => rec.name).join(" , ")}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
