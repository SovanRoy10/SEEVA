import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";

export default function ReplyWidget({ title, id, loadBlog }) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/v1/blog/${id}/comment`,
        { content: comment },
        { withCredentials: true }
      );
      setComment("");
      setLoading(false);
      toast.success("Comment added successfully");
      loadBlog();
    } catch (error) {
      const errorMsg = error?.data.message || error?.message;
      toast.error(errorMsg);
    }
  };
  return (
    <>
      <h3 className="cs_semibold cs_fs_24 mb-0">{title}</h3>
      <div className="cs_height_12" />
      <p className="cs_fs_18">
        Your email address will not be published. Required fields are marked *
      </p>
      <div className="cs_height_7" />
      <form action="#" onSubmit={handleAddComment}>
        <label className="cs_input_label cs_heading_color cs_fs_18 cs_medium">
          Comment*
        </label>
        <textarea
          cols={30}
          rows={8}
          className="cs_form_field_2"
          defaultValue={""}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="cs_height_20" />
        {/* <label className="cs_input_label cs_heading_color cs_fs_18 cs_medium">
          Your Name*
        </label>
        <input type="text" className="cs_form_field_2" />
        <div className="cs_height_20" />
        <label className="cs_input_label cs_heading_color cs_fs_18 cs_medium">
          Your Email*
        </label>
        <input type="email" className="cs_form_field_2" />
        <div className="cs_height_30" />
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            defaultValue=""
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Save my name and email in this browser for the next time I comment.
          </label>
        </div> */}
        <div className="cs_height_60" />
        <button className="cs_btn cs_style_1">
          {loading ? (
            <SyncOutlined spin className="py-1" />
          ) : (
            <span>Submit</span>
          )}
        </button>
      </form>
    </>
  );
}
