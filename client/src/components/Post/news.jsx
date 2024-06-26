import React from "react";
import { Link } from "react-router-dom";

export default function News({
  title,
  images,
  publishedDateTime,
  originalUrl,
  webUrl,
  excerpt,
}) {
  const date = new Date(publishedDateTime);

  return (
    <div className="cs_post cs_style_1">
      <Link to={webUrl} className="cs_post_thumb cs_view_mouse">
        {images && images.length > 0 ? (
          <img
            src={images[0]?.url}
            alt={title}
            width={images[0]?.width}
            height={images[0]?.height}
          />
        ) : (
          <img
            src="https://images.pexels.com/photos/3992933/pexels-photo-3992933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Default Image"
            width="300"
            height="200"
          />
        )}
      </Link>
      <div className="cs_post_info">
        <div className="cs_post_meta">
          <div className="cs_posted_by">
            {date.toLocaleDateString()} {date.toLocaleTimeString()}
          </div>
        </div>
        <h2 className="cs_post_title cs_semibold cs_fs_32">
          <Link to={webUrl}>{title}</Link>
        </h2>
        <p className="cs_post_excerpt">{excerpt}</p>
        {originalUrl && (
          <div className="cs_heading_color cs_medium">
            <Link to={originalUrl} className="cs_post_btn">
              Learn More
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
