import React, {
  useCallback,
  useContext,
  useState,
} from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { ConversationsContext } from "../context/ConversationsProvider";

export default function OpenConversation() {
  const [text, setText] = useState("");
  const { sendMessage, selectedConversation } =
    useContext(ConversationsContext);
  
  const setRef = useCallback((node) => {
    if (node) node.scrollIntoView({ smooth: true });
  }, []);
  
  // console.log(selectedConversation);
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(
      selectedConversation.recipients.map((r) => r.id),
      text
    );
    setText("");
  };


  return (
    <div className="d-flex flex-column flex-grow-1 ">
      <div className="flex-grow-1 overflow-auto">
        <div className=" d-flex flex-column align-items-start justify-content-end p-2 ">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index;
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`m-1 d-flex flex-column ${
                  message.fromMe ? "align-self-end align-items-end" : "align-items-start"
                }`}
              >
                <div
                  className={`rounded px-2 py-1 ${
                    message.fromMe ? "bg-primary text-white" : "border"
                  }`}
                >
                  {message.text}
                </div>
                <div
                  className={`text-muted small ${
                    message.fromMe ? "text-right" : ""
                  }`}
                >
                  {message.fromMe ? "You" : message.senderName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: "75px", resize: "none" }}
            />
            <Button type="submit" className="rounded-0">
              Send
            </Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}
