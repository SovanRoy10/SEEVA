import BlogCard from "../../components/blogCard/BlogCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:4000/api/v1/blog/", {
        withCredentials: true,
      });
      setBlogs(response.data.blogs);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to fetch blogs";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-5">
        <p className="text-2xl font-bold">Blogs</p>
        <Link to={"/blogs/add"} className="bg-blue-600 px-5 py-1 rounded-lg">
          Add new
        </Link>
      </div>
      {!loading && (
        <div>
          {blogs.length > 0 ? (
            <div className="grid grid-cols-3 gap-5">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          ) : (
            <p>No blogs available to display 😔.</p>
          )}
        </div>
      )}
      {loading && <Loader />}
    </div>
  );
}
