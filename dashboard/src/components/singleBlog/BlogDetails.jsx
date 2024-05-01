import RTE from "../editor/RTE";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function BlogDetails() {
  let { id } = useParams();
  const [blog, setBlog] = useState(null);
  useEffect(() => {}, []);

  const fetchBlogDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/blog/${id}`,
        { withCredentials: true }
      );
      setBlog(response.data.blog)
    } catch (error) {}
  };
  return (
    <div>
      <RTE blog={blog} id={id} />
    </div>
  );
}
