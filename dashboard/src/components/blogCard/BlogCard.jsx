import { Link } from "react-router-dom";

export default function BlogCard(props) {
  const titleLength = props.blog.title.length;
  const bodyLength = props.blog.body.length;
  return (
    <div className="max-w-full flex h-60">
      <img
        src={props.blog.coverImageUrl}
        alt="coverImage"
        className="object-cover w-1/3"
      />
      <div className="overflow-hidden border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold mb-2">
            {props.blog.title.slice(0, 50)} {titleLength > 50 && "..."}
          </div>
          <p
            className="text-gray-700 text-xs"
            // dangerouslySetInnerHTML={{
            //   __html: props.blog.body.replace(/<[^>]*>/g, "").slice(0, 250)
            // }}
          >
            {props.blog.body.replace(/<[^>]*>/g, "").slice(0, 250)}
            {bodyLength > 250 && "..."}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <Link
            to={`/blogs/${props.blog._id}`}
            className="bg-blue-600 text-xs px-2 py-1 rounded-md"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
