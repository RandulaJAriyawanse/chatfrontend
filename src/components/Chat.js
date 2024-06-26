import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
// import styles from './TypingIndicator.module.css';

import paperclipIcon from "@iconify/icons-lucide/paperclip";
import thumbsupIcon from "@iconify/icons-lucide/thumbs-up";
import thumbsdownIcon from "@iconify/icons-lucide/thumbs-down";
import sendHorizonalIcon from "@iconify/icons-lucide/send-horizonal";

// import ReactMarkdown from 'react-markdown';

import Icon from "../daisyui/components/Icon";
import {
  Button,
  Input,
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleTime,
} from "../daisyui/daisyui";
import DateUtil from "../daisyui/helpers/utils/date";
import { cn } from "../daisyui/helpers/utils/cn";
import avatar1 from "../daisyui/1.png";

// const REACT_APP_WS_URL = process.env.REACT_APP_WS_URL;

const hashtest = "hash13";

const dummyMessages = [
  {
    text: "Hi there! Can you help me with my account?",
    isBot: false,
    from_me: true, // Assuming 'from_me' means the message is from the user
  },
  {
    text: "Sure, I'd be happy to help! What seems to be the problem?",
    isBot: true,
    from_me: false,
  },
  {
    text: "I'm having trouble logging in.",
    isBot: false,
    from_me: true,
  },
  {
    text: "I've checked your account and it seems you need to reset your password. Would you like me to send you a reset link?",
    isBot: true,
    from_me: false,
  },
];

const SingleMessage = ({ message }) => {
  return (
    <div>
      <ChatBubble end={!message.isBot}>
        <ChatBubbleAvatar
          alt={"U"}
          src={!message.isBot ? avatar1 : avatar1}
          innerClassName={"bg-base-content/10 rounded-box p-0.5"}
          shape={"square"}
        />
        <ChatBubbleTime>
          {/* {DateUtil.formatted(message.send_at, { format: "hh:mm A" })} */}
          10:34 AM
        </ChatBubbleTime>
        <ChatBubbleMessage
          className={cn("min-h-fit py-3 text-base/none", {
            "bg-base-content/5 text-base-content": message.from_me,
            "bg-base-content/10 text-base-content": !message.from_me,
            "whitespace-pre-wrap": true,
          })}
        >
          {/* <ReactMarkdown> */}
          {message.text}
          {/* </ReactMarkdown> */}
        </ChatBubbleMessage>
      </ChatBubble>
    </div>
  );
};

async function generateThreadId(inputs) {
  const encoder = new TextEncoder();
  const dataString = inputs.join("");
  const data = encoder.encode(dataString);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // Convert bytes to hex string
  return hashHex;
}

const Chat = () => {
  // const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const ws = useRef(null);

  // useEffect(() => {
  //     console.log("websocket initiated")

  //     console.log(`${REACT_APP_WS_URL}/ws/chat/`)
  //     try{
  //     ws.current = new WebSocket(`${REACT_APP_WS_URL}/ws/chat/`);
  //     } catch (error) {
  //     }

  //     ws.current.onopen = async () => {
  //     const threadId = await generateThreadId([hashtest]);
  //     const initData = { type: "init", thread_id: threadId }
  //     ws.current.send(JSON.stringify(initData))
  //       }

  //     let accumulatedAnswer = ''
  //     let message_count = 0

  //     ws.current.onmessage =(event) => {
  //       const data = JSON.parse(event.data);

  //       if (data) {
  //         switch (data.kind) {
  //           case 'on_chat_model_init':
  //             setMessages(data.content)
  //             break;
  //           case 'on_chat_model_start':
  //             accumulatedAnswer = ''
  //             message_count = 0
  //             break;
  //           case 'on_chat_model_stream':
  //             message_count += 1
  //             if (message_count === 1) {
  //                 const botMessage = { text: '', isBot: true, pages: [] };
  //                 setMessages(prevMessages => {
  //                   if (prevMessages.length > 0) {
  //                       const newMessages = prevMessages.slice(0, prevMessages.length - 1);
  //                       return [...newMessages, botMessage];
  //                   } else {
  //                       return [botMessage];
  //                   }
  //                 });
  //             }
  //             accumulatedAnswer += data.content;
  //             setMessages(
  //                 prevMessages  => {
  //                 const newMessages = [...prevMessages ];
  //                 newMessages[newMessages.length - 1] = { ...newMessages[newMessages.length - 1], text: accumulatedAnswer };
  //                 return newMessages;
  //               }
  //             )
  //             break;
  //           case 'on_chat_model_end':
  //             break;
  //           default:
  //             console.log('Received unknown message kind:', data.kind);
  //             break;
  //         }
  //       } else {
  //         console.error('Message format incorrect or missing content:', data);
  //       }
  //     };

  //     return () => {
  //         ws.current.close();
  //     };
  // }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (!input.trim()) return;

    // const userMessage = { text: input, isBot: false };
    // setMessages([...messages, userMessage]);

    // const botMessage = { text: '...', isBot: true, pages: [], typing: true };
    // setMessages(prevMessages => [...prevMessages, botMessage]);

    // generateThreadId([hashtest]).then(threadId => {
    //     ws.current.send(JSON.stringify({ content: input, thread_id: threadId }));
    // });
    setInput("");
  };

  const viewportref = useRef(null);

  // useEffect(() => {
  //   if (viewportref !== null && viewportref.current !== null) {
  //     viewportref.current.scrollTo(0, viewportref.current.scrollHeight);
  //       }
  // }, [messages])

  return (
    // <div
    //   data-theme="light"
    //   className="mx-auto flex flex-col flex-grow w-full h-full"
    // >
    <div className="card h-full">
      <div className="card-body p-0">
        <div className="bg-primary card-actions justify-between content-center px-4 py-2 text-white">
          <span className="text-lg">Chat</span>
          <button className="btn btn-square btn-ghost btn-sm close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="chat-container">
          <div className="text-center my-4">
            <div className="avatar">
              <div className="w-16 rounded-full">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  alt="Tailwind-CSS-Avatar-component"
                />
              </div>
            </div>
            <p className="text-md font-medium">Name</p>
            <p className="text-sm text-gray-500">Hi, how may I help you</p>
          </div>
          <ScrollArea
            className="pl-5 pr-5 pb-5 overflow-auto w-full"
            // style={{ height: "calc(100vh)" }}

            viewportref={viewportref}
          >
            {dummyMessages.map((message, index) => (
              <SingleMessage message={message} key={index} />
            ))}
            <div className="flex gap-1 pl-1">
              <span className="text-xs pt-2 text-gray-500">
                Was this helpful?
              </span>
              <div>
                <Button
                  color={"ghost"}
                  size={"sm"}
                  shape={"circle"}
                  aria-label="Attachment"
                >
                  <Icon
                    icon={thumbsupIcon}
                    fontSize={18}
                    className="text-base-content/80"
                  />
                </Button>
                <Button
                  color={"ghost"}
                  size={"sm"}
                  shape={"circle"}
                  aria-label="Attachment"
                >
                  <Icon
                    icon={thumbsdownIcon}
                    fontSize={18}
                    className="text-base-content/80"
                  />
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
        <form
          onSubmit={handleSubmit}
          className="absolute left-0 bottom-0 w-full"
        >
          <div className="flex chat-input-outer gap-2 bg-base-content/5 px-4 py-2">
            {/* <Button
              color={"ghost"}
              size={"sm"}
              shape={"circle"}
              aria-label="Attachment"
            >
              <Icon
                icon={paperclipIcon}
                fontSize={18}
                className="text-base-content/80"
              />
            </Button> */}
            <div className="grow">
              <Input
                size={"sm"}
                className="chat-input"
                aria-label="Input message"
                name="message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message"
              />
            </div>
            <Button
              color={"primary"}
              size={"sm"}
              shape={"circle"}
              aria-label="Send message"
              type="submit"
            >
              <Icon icon={sendHorizonalIcon} fontSize={18} />
            </Button>
          </div>
        </form>
      </div>
    </div>
    // </div>
  );
};

export default Chat;
