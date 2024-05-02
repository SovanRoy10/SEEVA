import MessageCard from "../../components/message/MessageCard";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllMessages = async () => {
      try {
        setLoading(true);
        const request = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/message/getAll`,
          { withCredentials: true }
        );
        setMessages(request.data.messages);
      } catch (error) {
        toast.error(error.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    getAllMessages();
  }, []);

  const handleDeleteMessage = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/message/delete/${id}`,
        { withCredentials: true }
      );
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message._id !== id)
      );

      toast.success("Message Deleted Successfully!");
    } catch (error) {
      const errorMessage = error.data?.message;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="mb-5 text-2xl">Messages</p>
      {!loading && (
        <div className="grid grid-cols-3 gap-5">
          {messages.map((message, index) => {
            return (
              <MessageCard
                key={index}
                message={message}
                handleDeleteMessage={handleDeleteMessage}
              />
            );
          })}
        </div>
      )}
      {loading && <Loader />}
    </div>
  );
}
