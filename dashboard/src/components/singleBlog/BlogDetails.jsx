import RTE from "../editor/RTE";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function BlogDetails() {
  let { id } = useParams();
  const [blog, setBlog] = useState({});
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState(null);


  useEffect(() => {
    fetchBlogDetails();
  }, []);

  const fetchBlogDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/blog/${id}`,
        { withCredentials: true }
      );
      setBlog(response.data.blog);
      setUser(response.data.user);
      setComments(response.data.comments);
    } catch (error) {
      const errMsg = error.data?.message || error.message;
      toast.error(errMsg);
    }
  };
  return (
    <div>
      <RTE blog={blog} id={id}/>
    </div>
  );
}
