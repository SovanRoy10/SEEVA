import React from "react";
import { Link } from "react-router-dom";
import Spacing from "../Spacing";
import { Icon } from "@iconify/react";

export default function CommentsWidget({ title, comments }) {
  console.log(comments);
  return (
    <div id="comments" className="comments-area">
      <h2 className="comments-title cs-semi_bold cs_fs_24 cs_semibold mb-0">
        {title}
      </h2>
      <Spacing md="45" />
      <ol className="comment-list">
        {/* <li className="comment">
          <div className="comment-body">
            <div className="comment-author vcard">
              <img
                className="avatar"
                src="/images/blog/avatar_1.png"
                alt="Author"
              />
              <Link to="/" className="url">
                George Steven
              </Link>
            </div>
            <div className="comment-meta">
              <Icon icon="fa6-solid:clock" />
              <Link to="/">Jan 24, 2023 </Link>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation.
            </p>
            <div className="reply">
              <Link className="comment-reply-link" to="/">
                Reply
              </Link>
            </div>
          </div>
          <ol className="children">
            <li className="comment">
              <div className="comment-body">
                <div className="comment-author vcard">
                  <img
                    className="avatar"
                    src="/images/blog/avatar_2.png"
                    alt="Author"
                  />
                  <Link to="/" className="url">
                    Sarah Taylor
                  </Link>
                </div>
                <div className="comment-meta">
                  <Icon icon="fa6-solid:clock" />
                  <Link to="/">Jan 24, 2022 at 9:59 am </Link>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud.
                </p>
                <div className="reply">
                  <Link className="comment-reply-link" to="/">
                    Reply
                  </Link>
                </div>
              </div>
            </li>
          </ol>
        </li> */}
        {comments &&
          comments.length > 0 &&
          comments.map((comment) => (
            <li key={comment._id} className="comment">
              <div className="comment-body">
                <div className="comment-author vcard">
                  <img
                    className="avatar"
                    src={comment.createdBy?.profileImageUrl}
                    alt="Author"
                  />
                  <Link to="/" className="url">
                    {comment.createdBy.name}
                  </Link>
                </div>
                <div className="comment-meta">
                  <Icon icon="fa6-solid:clock" />
                  <Link to="/">{comment.createdAt} at 9:59 am </Link>
                </div>
                <p>{comment.content}</p>
                <div className="reply">
                  <Link className="comment-reply-link" to="/">
                    Reply
                  </Link>
                </div>
              </div>
            </li>
          ))}
        {/* #comment-## */}
      </ol>
      {/* .comment-list */}
    </div>
  );
}
