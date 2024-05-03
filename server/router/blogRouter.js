import express from "express";

import {
  isAdminAuthenticated,
  isUserAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

import { handlePostAddBlog,handleGetSingleBlog, handleGetAllBlogs,handleDeleteBlog,handleUpdateBlog,handleAddNewComment,handleDeleteComment } from "../controller/blog.js";

//blogs
router.post("/add", isAdminAuthenticated, handlePostAddBlog);
router.get("/:id", handleGetSingleBlog);
router.get("/", handleGetAllBlogs);
router.delete("/:id", isAdminAuthenticated, handleDeleteBlog);
router.put("/:id", isAdminAuthenticated, handleUpdateBlog);

// comments
router.post("/:id/comment", isUserAuthenticated, handleAddNewComment);
router.delete("/comment/:id", isUserAuthenticated, handleDeleteComment);

export default router;
