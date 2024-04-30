import BlogCard from "../../components/blogCard/BlogCard"

export default function Blogs() {
  return (
    <div className="grid grid-cols-3 gap-5">
        <BlogCard/>
        <BlogCard/>
        <BlogCard/>
        <BlogCard/>
    </div>
  )
}
