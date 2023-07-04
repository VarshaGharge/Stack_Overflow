import { useState } from "react";
import styled from "styled-components";
import { IoClose, IoSend } from "react-icons/io5";
import { Alert } from "react-bootstrap";

import "./chat.css";
import robo from "../../assets/chatBot.png";
import guest from "../../assets/guest.svg";
import { SMSAuthenticator } from "./messageService";

function Chat() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userState, setUserState] = useState("");

  const [botOpen, setBotOpen] = useState(false);
  const [inputOpen] = useState(true);
  const [showIntro] = useState(true);

  const smsAuth = SMSAuthenticator();

  const chat = async (e, message) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    if (isAuthenticated) {
      setMessage("");
      fetch("https://stack-overflow-clone-hih1.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chats,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          postMessages(msgs, data.output);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (userState === "Phone" && isValidPhoneNumber(message)) {
      setMessage("");
      setUserState("OTP");
      smsAuth.sendSMS(message);
      const otpMsg = {
        role: "assistant",
        content: "Please enter OTP sent to provided number",
      };
      postMessages(msgs, otpMsg);
    } else if (userState === "OTP") {
      setMessage("");
      setUserState("");

      await smsAuth.verifyOTP(message);
      console.log("Verified",smsAuth.verified);
      if (smsAuth.verified) {
        setIsAuthenticated(true);
        const otpMsg = {
          role: "assistant",
          content: "Verified!!! How may I assist you",
        };
        postMessages(msgs, otpMsg);
      } else {
        setIsAuthenticated(false);
        const otpMsg = {
          role: "assistant",
          content:
            "Please re-enter correct number to validate (e.g +xx xxxxx xxxxx)",
        };
        postMessages(msgs, otpMsg);
      }
    } else {
      setMessage("");
      setUserState("Phone");
      const validateUserMsg = {
        role: "assistant",
        content:
          "Hey Pal! Please enter correct number to validate (e.g +xx xxxxx xxxxx)",
      };
      postMessages(msgs, validateUserMsg);
    }
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const regex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/; // Regex for validating country code and phone number
    return regex.test(phoneNumber);
  };

  const postMessages = (msgs, output) => {
    setIsTyping(true);
    msgs.push(output);
    setChats(msgs);
    setIsTyping(false);
  };

  const welcomeMessage = () => {
    let msgs = chats;
    const welcomeMsg = {
      role: "assistant",
      content:
        "Hello Pal! Please enter your number to validate (e.g +xx xxxxx xxxxx)",
    };
    postMessages(msgs, welcomeMsg);
    setUserState("Phone");
  };

  return (
    <>
      <div
        className="stackBot"
        onClick={() => setBotOpen(!botOpen ? true : true)}
      >
        <img src={robo} alt="" width="100" />
      </div>
      <BotWrapper>
        <Header
          className={!botOpen ? "d-none" : "d-block"}
          onClick={() => setBotOpen(botOpen ? false : false)}
        >
          <p>
            <strong>StackBot</strong>
          </p>
          <CloseBtn>
            <IoClose />
          </CloseBtn>
        </Header>
        <MessageWindow className={!botOpen ? "d-none" : "d-block"}>
          <ul className="chatbot__messages">
            <Alert show={showIntro} variant="success">
              <div className="d-flex align-items-center">
                <Alert.Heading className="ms-2 mt-2">
                  Hello I'm Stackbot.
                </Alert.Heading>
              </div>
              <hr />
              <div className="d-flex justify-content-end"></div>
            </Alert>

            {chats && chats.length
              ? chats.map((chat, index) => (
                  <p
                    key={index}
                    className={chat.role === "user" ? "user_msg" : ""}
                  >
                    <div className="chat">
                      {chat.role === "assistant" ? (
                        <>
                          <img src={robo} className="robo" alt="" width="65" />
                          <div className="system-content">{chat.content}</div>
                        </>
                      ) : (
                        <>
                          <div className="guest-content">{chat.content}</div>
                          <img
                            src={guest}
                            className="guest"
                            alt=""
                            width="25"
                          />
                        </>
                      )}
                    </div>
                  </p>
                ))
              : ""}

            <div className={isTyping ? "" : "hide"}>
              <p>
                <i>{isTyping ? "..." : ""}</i>
              </p>
            </div>
          </ul>
        </MessageWindow>

        <form
          action=""
          onSubmit={(e) => chat(e, message)}
          className={!botOpen ? "d-none" : "d-block"}
        >
          <div
            className={!inputOpen ? "chatbot__entry  d-none" : "chatbot__entry"}
          >
            <input
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              name="message"
              type="text"
              autoComplete="off"
              placeholder="Write a message..."
              className="chatbot__input"
            />
            <SendBtn
              type="submit"
              className={
                message.replace(/\s{2,}/g, " ").trim() === ""
                  ? "text-dark"
                  : "text-primary"
              }
            >
              <IoSend />
            </SendBtn>
          </div>
        </form>
      </BotWrapper>
    </>
  );
}

const BotWrapper = styled.div`
  position: fixed;
  margin-top: 50%;
  width: 100%;
  bottom: 0;
  border-radius: 20px;
  box-shadow: 0 -6px 99px -17px rgba(0, 0, 0, 0.68);
  z-index: 99;
  @media screen and (min-width: 640px) {
    max-width: 20%;
    right: 80px;
    top: auto;
  }
`;
const Header = styled.div`
  color: #fff;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #275cab;
  height: 54px;
  padding: 0 20px;
  cursor: pointer;
  border-radius: 5px 5px 0px 0px;
  transition: background-color 0.2s ease;
  border-bottom: 3px solid #94caf1;
  p {
    margin: 0;
  }
  &:hover {
    background-color: #0f3c7e;
  }
`;
const CloseBtn = styled.div`
  svg {
    font-size: 1.3rem;
  }
`;
const MessageWindow = styled.div`
  width: 100%;
  height: calc(100% - (54px + 60px));
  padding: 40px 20px 20px;
  background-color: #fff;
  overflow-x: none;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
  @media screen and (min-width: 640px) {
    height: 380px;
  }
`;
const SendBtn = styled.button`
  border: none;
  cursor: pointer;
  margin: 0;
  padding: 0;
  background: none;
  svg {
    font-size: 1.2rem;
  }
`;

export default Chat;
