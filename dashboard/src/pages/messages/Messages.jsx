import MessageCard from "../../components/message/MessageCard";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getAllMessages = async () => {
      const request = await axios.get(
        "http://localhost:4000/api/v1/message/getAll",
        { withCredentials: true }
      );
      setMessages(request.data.messages);
    };
    getAllMessages();
  }, []);

  const handleDeleteMessage = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/message/delete/${id}`,
        { withCredentials: true }
      );
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message._id !== id)
      );

      toast.success("Message Deleted Successfully!");
    } catch (error) {
      const errorMessage = error.data?.message;
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <p className="mb-5 text-2xl">Messages</p>
      <div className="grid grid-cols-3 gap-5">
        {messages.map((message, index) => {
          return <MessageCard key={index} message={message} handleDeleteMessage = {handleDeleteMessage}/>;
        })}
      </div>
    </div>
  );
}
