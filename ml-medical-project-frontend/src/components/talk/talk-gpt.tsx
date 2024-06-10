import { Input } from "reactstrap";
import React, { useState, useRef, useEffect } from "react";
import "./talk-gpt.css";
import openai from "../../scripts/gptCommunication";

function Info() {
  const [chats, setChats] = useState<string[]>([]);
  const [threadId, setThreadId] = useState<string | null>(null); // State to hold the threadId

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to establish connection with the assistant when the component mounts
    const initializeAssistant = async () => {
      const thread = await openai.beta.threads.create({});
      setThreadId(thread.id);
    };

    initializeAssistant();
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the chat area when chats change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  // Function to handle sending and receiving messages
  const sendMessage = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const messageToSend = e.currentTarget.value;
      setChats((prevChats) => [...prevChats, "Tu:\n" + messageToSend]);
      e.currentTarget.value = ""; // Clear the input field after updating chats

      if (threadId) {
        const myThreadMessage = await openai.beta.threads.messages.create(
          threadId,
          {
            role: "user",
            content: messageToSend,
          }
        );
        // const assistantId = process.env.ASSISTANT_ID?.toString() || "";
        const assistantId = "PONER ACA EL ID DEL ASISTENTE"?.toString() || "";
        const myRun = await openai.beta.threads.runs.create(threadId, {
          assistant_id: assistantId,
        });
        const retrieveRun = async () => {
          let keepRetrievingRun;

          while (myRun.status === "queued" || myRun.status === "in_progress") {
            keepRetrievingRun = await openai.beta.threads.runs.retrieve(
              threadId,
              myRun.id
            );
            console.log(`Run status: ${keepRetrievingRun.status}`);

            if (keepRetrievingRun.status === "completed") {
              console.log("\n");

              // Step 7: Retrieve the Messages added by the Assistant to the Thread
              const allMessages = await openai.beta.threads.messages.list(
                threadId
              );

              console.log(
                "------------------------------------------------------------ \n"
              );

              const receivedMessage =
                "Asistente:\n" + allMessages.data[0].content[0].text.value;
              setChats((prevChats) => [...prevChats, receivedMessage]);

              break;
            } else if (
              keepRetrievingRun.status === "queued" ||
              keepRetrievingRun.status === "in_progress"
            ) {
              // pass
            } else {
              console.log(`Run status: ${keepRetrievingRun.status}`);
              break;
            }
          }
        };
        retrieveRun();
      }

      e.currentTarget.value = ""; // Clear the input field after updating chats
    }
  };

  return (
    <div className="chat-all-container">
      <div>
        <img className="oncologa" src="src/img/oncologa.png" alt="oncologa" />
      </div>
      <div className="chat-container">
        <div className="chat" ref={chatContainerRef}>
          {chats.map((chat, index) => (
            <div key={index} className="chat-column">
              {chat}
            </div>
          ))}
        </div>

        <div className="input-container">
          {/* Input field to enter new chats */}
          <Input
            className="talk"
            type="textarea"
            onKeyDown={sendMessage}
            placeholder="Talk with us....."
          />
        </div>
      </div>
    </div>
  );
}

export default Info;
