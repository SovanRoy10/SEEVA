import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";

export default function Post({
  title,
  coverImageUrl,
  createdAt,
  _id,
  href,
  socialShare,
  variant,
}) {
  const date = new Date(createdAt);
  // console.log(_id);
  return (
    <div className={`cs_post cs_style_1 ${variant}`}>
      <Link to={href} className="cs_post_thumb cs_view_mouse">
        <img src={coverImageUrl} alt={title} />
      </Link>
      <div className="cs_post_info">
        <div>
          <div className="cs_post_meta">
            <div className="cs_posted_by">
              {date.toLocaleDateString()} {date.toLocaleTimeString()}
            </div>
            {socialShare && (
              <div className="cs_post_social">
                <Link to="/" className="cs_center rounded-circle">
                  <Icon icon="fa-brands:linkedin-in" />
                </Link>
                <Link to="/" className="cs_center rounded-circle">
                  <Icon icon="fa-brands:facebook-f" />
                </Link>
                <Link to="/" className="cs_center rounded-circle">
                  <Icon icon="fa-brands:twitter" />
                </Link>
              </div>
            )}
          </div>
          <h2 className="cs_post_title cs_semibold cs_fs_32">
            <Link to={href}>{title}</Link>
          </h2>
        </div>
        {_id && (
          <div className="cs_heading_color cs_medium">
            <Link to={`/blog/${_id}`} className="cs_post_btn">
              Learn More
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
