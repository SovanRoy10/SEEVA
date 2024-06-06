import React from "react";
import Pagination from "../../Pagination";
import Post from "../../Post";
import Spacing from "../../Spacing";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function BlogSectionStyle2({ data, loading }) {
  const skeletonPosts = Array.from({ length: 6 });

  return (
    <div className="container">
      <div className="row cs_row_gap_50">
        {loading
          ? skeletonPosts.map((_, index) => (
              <div className="col-xl-4 col-md-6" key={index}>
                <Post loading={true} />
              </div>
            ))
          : data?.map((item, index) => (
              <div className="col-xl-4 col-md-6" key={index}>
                <Post {...item} loading={false} />
              </div>
            ))}
      </div>
      <Spacing md="110" lg="70" />
      <Pagination />
    </div>
  );
}
