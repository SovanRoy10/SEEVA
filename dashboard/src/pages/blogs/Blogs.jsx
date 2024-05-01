import BlogCard from "../../components/blogCard/BlogCard";
import { Link } from "react-router-dom";

export default function Blogs() {
  return (
    <div>
      <div className="flex justify-between mb-5">
        <p className="text-2xl font-bold">Blogs</p>
        <Link to={"/blogs/add"} className="bg-blue-600 px-5 py-1 rounded-lg">
          Add new
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </div>
  );
}
