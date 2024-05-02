import RTE from "../editor/RTE";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../loader/Loader";

export default function BlogDetails() {
  let { id } = useParams();
  const [blog, setBlog] = useState({});
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlogDetails();
  }, []);

  const fetchBlogDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}`,
        { withCredentials: true }
      );
      setBlog(response.data.blog);
      setUser(response.data.blog.createdBy);
      setComments(response.data.comments);
    } catch (error) {
      const errMsg = error.data?.message || error.message;
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  // console.log(user)

  const handleDeleteComment = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/comment/${id}`,
        { withCredentials: true }
      );
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== id)
      );
      toast.success("Comment deleted successfully");
    } catch (error) {
      const errorMsg = error?.data.message || error?.message;
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}/comment`,
        { content: comment },
        { withCredentials: true }
      );
      setComments((prevComments) => [...prevComments, response.data.comment]);
      setComment("");
      // console.log(response.data.comment)
      toast.success("Comment added successfully");
    } catch (error) {
      const errorMsg = error?.data.message || error?.message;
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {!loading && (
        <>
          <RTE blog={blog} id={id} />

          <div id="author" className="mb-6">
            <p className="mb-4 text-2xl font-bold">Author</p>
            <div className="flex gap-5">
              <img
                src={user?.profileImageUrl}
                alt="profile Image"
                className="w-[50px] h-[50px] rounded-full"
              />
              <div className="flex flex-col justify-center">
                <p>
                  {user?.name} (
                  {new Date(user?.updatedAt).toLocaleDateString("en-US", {
                    weekday: "long", // "Monday"
                    year: "numeric", // "2024"
                    month: "long", // "April"
                    day: "numeric", // "13"
                  })}
                  )
                </p>
                <p>{user?.email}</p>
              </div>
            </div>
          </div>

          <form className="mb-6">
            <label htmlFor="comment" className="block mb-2 text-2xl font-bold">
              Add Comment
            </label>
            <input
              type="text"
              id="comment"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter Comment"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
            <button
              type="submit"
              onClick={handleAddComment}
              className="bg-blue-600 px-4 py-2 rounded-lg my-4"
            >
              Add
            </button>
          </form>

          <div
            id="comments"
            className="max-w-2xl border-white border-2 px-5 py-2 rounded-xl"
          >
            <p className="text-2xl font-bold mb-4">Comments</p>
            {comments?.length > 0 &&
              comments.map((comment, index) => {
                return (
                  <div
                    key={comment._id}
                    className={`flex flex-col ${
                      index !== comments.length - 1 &&
                      "border-white border-b-[1px]"
                    } mb-2`}
                  >
                    <div className="flex gap-5 mb-4">
                      <img
                        src={comment?.createdBy.profileImageUrl}
                        alt="creater"
                        className="w-[50px] h-[50px] rounded-full"
                      />
                      <div className="flex-col">
                        <p>{comment?.createdBy.name}</p>
                        <p>
                          {new Date(comment?.updatedAt).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long", // "Monday"
                              year: "numeric", // "2024"
                              month: "long", // "April"
                              day: "numeric", // "13"
                            }
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <p>{comment?.content}</p>
                      <button
                        className="text-red-700 bg-red-200 rounded-full p-2 hover:bg-red-300"
                        onClick={() => handleDeleteComment(comment._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}

            {comments?.length === 0 && <div>No Comments 😔</div>}
          </div>
        </>
      )}
      {loading && <Loader/>}
    </>
  );
}
