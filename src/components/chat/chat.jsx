import { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";
import { useNotificationsStore } from "../../store/notificationsStore";

const Chat = ({ chats }) => {
  const [chat, setChat] = useState(null);
  const messageEndRef = useRef();

  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  const decrease = useNotificationsStore((state) => state.decrease);

  const handleOpenChat = async (chatId, receiver) => {
    try {
      const response = await apiRequest(`/chats/${chatId}`);
      if (!response.data.data.chat.seenBy.includes(currentUser.id)) {
        decrease();
      }
      setChat({ ...response.data.data.chat, receiver });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) return;

    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text });
      setChat((prev) => ({
        ...prev,
        messages: [...prev.messages, res.data.data.message],
      }));

      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data.data.message,
      });

      e.target.reset();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (messageEndRef.current)
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read" + chat.id);
      } catch (err) {
        console.log(err);
      }
    };

    if (chat && socket) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }

    return () => {
      socket.off("getMessage");
    };
  }, [chat, socket]);

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>

        {chats?.map((c) => (
          <div
            className="message"
            key={c.id}
            style={{
              backgroundColor:
                c?.seenBy?.includes(currentUser.id) || chat?.id === c.id
                  ? "white"
                  : "#fecd514e",
            }}
            onClick={() => handleOpenChat(c.id, c.receiver)}
          >
            <img src={c.receiver.avatar || "/noavatar.png"} alt="" />
            <span>{c.receiver.username}</span>
            <p>{c.lastMessage}</p>
          </div>
        ))}
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chat.receiver.avatar || "/noavatar.png"} alt="" />
              {chat.receiver.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {chat.messages.map((message) => (
              <div
                className="chatMessage"
                key={message.id}
                style={{
                  alignSelf:
                    message.userId === currentUser.id
                      ? "flex-end"
                      : "flex-start",
                  textAlign:
                    message.userId === currentUser.id ? "right" : "left",
                }}
              >
                <p>{message.text}</p>
                <span>{format(message.CreateAt)}</span>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
