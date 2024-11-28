import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMessages } from "../../action/chat.js";
import { setcurrentuser } from "../../action/currentuser";
import io from "socket.io-client";
import CryptoJS from "crypto-js";
import "./chat.css";

// const socket = io("https://youtube-clone-3ge8.onrender.com");
// const socket = io("https://youtubeclone-server.vercel.app");
const socket = io("http://localhost:5000");

const Chat = ({ roomId, userId, userName }) => {
  const dispatch = useDispatch();

  // Get messages from Redux store
  const messages = useSelector((state) => state.chat?.messages || []);
  const currentuser = useSelector((state) => state.currentuserreducer);
  // console.log(currentuser?.result.name)

  const [message, setMessage] = useState("");
  const [localMessages, setLocalMessages] = useState([]); // To manage local state for messages

  useEffect(() => {
    // Fetch messages when component mounts
    dispatch(getAllMessages(roomId));

    socket.on("connect", () => {
      console.log("Socket connected with ID: ", socket.id);
    });

    socket.on("message", (newMessage) => {
      console.log("New message received: ", newMessage);
      dispatch({ type: "NEW_MESSAGE", payload: newMessage }); // Add message to Redux store
      setLocalMessages((prev) => [
        ...prev,
        { ...newMessage, decrypted: decryptMessage(newMessage.message) },
      ]); // Update local state with decrypted message
    });

    return () => {
      socket.off("message");
    };
  }, [dispatch, roomId]);

  useEffect(() => {
    // Join the room
    socket.emit("joinRoom", { roomId, userId });

    return () => {
      socket.emit("leaveRoom", { roomId });
    };
  }, [roomId, userId]);

  useEffect(() => {
    // Sync Redux messages to local state
    const updatedMessages = messages.map((msg) => ({
      ...msg,
      decrypted: decryptMessage(msg.message),
    }));
    setLocalMessages(updatedMessages);
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      // Encrypt message
      const encryptedMessage = encryptMessage(message);
      const newMessage = { roomId, userId, message: encryptedMessage };

      // Emit the message to the server
      socket.emit("chatMessage", newMessage);

      // Add the message locally to display immediately
      setLocalMessages((prev) => [
        ...prev,
        { ...newMessage, decrypted: message },
      ]);

      setMessage(""); // Clear input field
    }
  };

  const encryptMessage = (plainText) => {
    const iv = CryptoJS.lib.WordArray.random(16);
    const key = CryptoJS.enc.Utf8.parse("abcdefghijklmnopqrstuvwxzy012345"); // Ensure it matches server-side key
    const encrypted = CryptoJS.AES.encrypt(plainText, key, {
      iv: iv,
      mode: CryptoJS.mode.CTR,
      padding: CryptoJS.pad.NoPadding,
    });
    return iv.toString(CryptoJS.enc.Hex) + ":" + encrypted.ciphertext.toString(CryptoJS.enc.Hex);
  };

  const decryptMessage = (encryptedMessage) => {
    if (!encryptedMessage.includes(":")) {
      return "[Error: Invalid message format]";
    }

    const [ivHex, encryptedText] = encryptedMessage.split(":");
    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const key = CryptoJS.enc.Utf8.parse("abcdefghijklmnopqrstuvwxzy012345"); // Ensure it matches server-side key

    try {
      const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: CryptoJS.enc.Hex.parse(encryptedText) },
        key,
        {
          iv: iv,
          mode: CryptoJS.mode.CTR,
          padding: CryptoJS.pad.NoPadding,
        }
      );
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      return "[Error: Decryption failed]";
    }
  };

  return (
    <div className="chat-window">
     <div className="chat-header">
        <h4>Chat Room: {roomId}</h4> {/* Display the roomId */}
      </div>
      <div className="chat-history">
        {localMessages && localMessages.length > 0 ? (
          localMessages.map((msg, index) => (
            <div
              key={index}
              className={msg.userId === userId ? "my-message" : "other-message"}
            >
              <strong>
                {msg.userId === userId ? `${currentuser?.result.name}` : `User ${msg.userId}`}:
              </strong>{" "}
              {msg.decrypted || "[Error: Decryption failed]"}
            </div>
          ))
        ) : (
          <p>Welcome, {currentuser?.result.name || "Guest"}</p>
        )}
      </div>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="chat-input"
      />
      <button onClick={sendMessage} className="chat-send-button">
        Send
      </button>
    </div>
  );
};

export default Chat;
