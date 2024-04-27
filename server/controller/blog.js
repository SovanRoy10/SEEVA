import { Blog } from "../models/blog";
import { Comment } from "../models/comments";
import { catchAsyncErros } from "../middlewares/catchAsyncErros";

// export const handlePostAddBlog = catchAsyncErros(async (req, res) => {
//   //   console.log(req.body);
//   //   console.log(req.file);
//   const blog = await Blog.create({
//     coverImageUrl: `/uploads/${req.file.filename}`,
//     title: req.body.title,
//     body: req.body.body,
//     createdBy: req.user._id,
//   });

//   return res.redirect(`/blog/${blog._id}`);
// });

// export const handleGetSingleBlog = catchAsyncErros(async (req, res) => {
//   const blog = await Blog.findById(req.params.id).populate("createdBy");
//   const comments = await Comment.find({ blogId: req.params.id }).populate(
//     "createdBy"
//   );
//   //   console.log(blog);
//   //   console.log(comments);
//   return res.render("blog", {
//     user: req.user,
//     blog: blog,
//     comments: comments,
//   });
// });

// export const handleAddNewComment = catchAsyncErros(async (req, res) => {
//   const comment = await Comment.create({
//     content: req.body.content,
//     blogId: req.params.blogId,
//     createdBy: req.user._id,
//   });

//   return res.redirect(`/blog/${req.params.blogId}`);
// });
