import { Blog } from "../models/blog.js";
import { Comment } from "../models/comments.js";
import { catchAsyncErros } from "../middlewares/catchAsyncErros.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import cloudinary from "cloudinary";

export const handlePostAddBlog = catchAsyncErros(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0)
    return next(new ErrorHandler("Blog CoverImage Required!", 400));

  // console.log(req.files)
  const { coverImageUrl } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

  if (!allowedFormats.includes(coverImageUrl.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }

  const { title, body } = req.body;
  if (!title || !body)
    return next(new ErrorHandler("Please Fill up the form", 400));

  const cloudinaryResponse = await cloudinary.uploader.upload(
    coverImageUrl.tempFilePath
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    return next(
      new ErrorHandler("Failed To Upload Blog Cover Image To Cloudinary", 500)
    );
  }

  const blog = await Blog.create({
    coverImageUrl: cloudinaryResponse.secure_url,
    title: req.body.title,
    body: req.body.body,
    createdBy: req.user._id,
  });

  return res.status(200).json({
    success: true,
    blog,
  });
});

export const handleGetSingleBlog = catchAsyncErros(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorHandler("Id not found", 404));

  const blog = await Blog.findById(req.params.id).populate("createdBy");
  if (!blog) {
    return next(new ErrorHandler("Blog not found", 404));
  }
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );

  return res.status(200).json({
    success: true,
    blog,
    comments: comments,
  });
});

export const handleGetAllBlogs = catchAsyncErros(async (req, res, next) => {
  const blogs = await Blog.find();
  if (!blogs) return next(ErrorHandler("No Blog Found", 400));
  res.status(200).json({
    success: true,
    blogs,
  });
});

export const handleDeleteBlog = catchAsyncErros(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorHandler("Id not found", 404));
  const blog = await Blog.findById(id);
  if (!blog) {
    return next(new ErrorHandler("Blog Not Found!", 404));
  }
  await blog.deleteOne();
  res.status(200).json({
    success: true,
    message: "Blog Deleted!",
  });
});

export const handleUpdateBlog = catchAsyncErros(async (req, res, next) => {
  const { id } = req.params;

  if (!id) return next(new ErrorHandler("Blog ID is not found!", 400));

  const { title, body } = req.body;

  if (!title || !body) return next(new ErrorHandler("Fill up form!", 400));

  // Initialize update object
  let updateData = {
    title,
    body,
  };

  // Handling profile image update
  if (req.files && req.files.coverImageUrl) {
    const { coverImageUrl } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(coverImageUrl.mimetype)) {
      return next(new ErrorHandler("File format not supported!", 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
      coverImageUrl.tempFilePath
    );
    if (cloudinaryResponse.error) {
      return next(
        new ErrorHandler("Failed to upload Blog Cover Image to Cloudinary", 500)
      );
    }
    updateData.profileImageUrl = cloudinaryResponse.secure_url;
  }

  // Perform the update
  const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!updatedBlog) {
    return next(new ErrorHandler("Blog not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Blog updated successfully!",
    blog: updatedBlog,
  });
});

export const handleAddNewComment = catchAsyncErros(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorHandler("BlogId not found", 400));

  const blog = await Blog.findById(id);
  if (!blog) {
    return next(new ErrorHandler("Blog Not Found!", 404));
  }

  const { content } = req.body;
  if (!content) return next(new ErrorHandler("Please Fill up the form", 400));

  const comment = new Comment({
    content: req.body.content,
    blogId: id,
    createdBy: req.user._id,
  });

  await comment.save();
  await comment.populate("createdBy");

  return res.status(200).json({
    success: true,
    message: "Comment Added Successfully",
    comment,
  });
});

export const handleDeleteComment = catchAsyncErros(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorHandler("Id not found", 404));
  const comment = await Comment.findById(id);
  if (!comment) {
    return next(new ErrorHandler("Comment Not Found!", 404));
  }
  await comment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Comment Deleted!",
  });
});
