import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Section from "../Section";
import Breadcrumb from "../Breadcrumb";
import BannerSectionStyle9 from "../Section/BannerSection/BannerSectionStyle9";
import { Icon } from "@iconify/react";
import Spacing from "../Spacing";
import Post from "../Post";
import Sidebar from "../Sidebar";
import AuthorWidget from "../Widget/AuthorWidget";
import CommentsWidget from "../Widget/CommentsWidget";
import ReplyWidget from "../Widget/ReplyWidget";
import { pageTitle } from "../../helpers/PageTitle";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function BlogDetails() {
  const { blogId } = useParams();
  const blogRef = useRef(null);
  const [blog, setBlog] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [blogComments, setBlogComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBlog();
  }, []);

  const loadBlog = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/v1/blog/${blogId}`
      );
      setBlog(data.blog);
      setBlogComments(data.comments);
      setLoading(false);
    } catch (error) {
      console.error("Error loading blog:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/v1/blog/`
        );
        setBlogs(data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (blogRef.current) {
      const images = blogRef.current.querySelectorAll("img");
      images.forEach((image) => {
        image.style.width = "100%";
        image.style.height = "auto";
      });
    }
  }, [blog]);

  pageTitle("Blog Details");

  return (
    <>
      <Section topMd={170} bottomMd={54} bottomLg={54}>
        <Breadcrumb title={loading ? <Skeleton width={200} /> : blog.title} />
      </Section>
      <div className="container">
        <div className="cs_blog_details_info">
          <div className="cs_blog_details_info_left">
            <div className="cs_blog_details_date">
              {loading ? (
                <Skeleton width={100} />
              ) : (
                new Date(blog.createdAt).toLocaleDateString()
              )}{" "}
              |{" "}
              {loading ? (
                <Skeleton width={100} />
              ) : (
                blog.createdBy && blog.createdBy.name
              )}
            </div>
          </div>
          <div className="cs_social_links_wrap">
            <h2>Share:</h2>
            <div className="cs_social_links">
              <Link to="/">
                <Icon icon="fa-brands:facebook-f" />
              </Link>
              <Link to="/">
                <Icon icon="fa-brands:linkedin-in" />
              </Link>
              <Link to="/">
                <Icon icon="fa-brands:twitter" />
              </Link>
            </div>
          </div>
        </div>
        <Spacing md="55" />
        {loading ? (
          <Skeleton height={200} />
        ) : (
          <>
            {blog.coverImageUrl && (
              <img
                src={blog.coverImageUrl}
                alt="Blog Details"
                className="w-100 cs_radius_20"
              />
            )}
            <Spacing md="90" lg="50" />
            <div className="row">
              <div className="col-lg-8">
                <div
                  ref={blogRef}
                  className="cs_blog_details"
                  dangerouslySetInnerHTML={{ __html: loading ? "" : blog.body }}
                />
                <Spacing md="85" />
                <AuthorWidget
                  imgUrl={
                    loading
                      ? null
                      : blog.createdBy && blog.createdBy.profileImageUrl
                  }
                  name={
                    loading ? (
                      <Skeleton width={200} />
                    ) : (
                      blog.createdBy && blog.createdBy.name
                    )
                  }
                  description={
                    loading ? (
                      <Skeleton width={200} />
                    ) : (
                      "Our Seeva group administrators are key leaders in healthcare institutions, managing finances, staff, and facilities to ensure smooth operations. They oversee strategic planning, policy implementation, and resource allocation while maintaining high standards of care. Their role involves collaboration with medical professionals, regulatory compliance, and advocacy for the hospital's interests. In essence, hospital administrators drive efficiency, quality, and innovation in healthcare delivery, ultimately improving patient outcomes and community well-being."
                    )
                  }
                />
                <Spacing md="110" />
                <CommentsWidget title="Comments" comments={blogComments} />
                <Spacing md="92" />
                <ReplyWidget
                  title="Leave a Reply"
                  id={blogId}
                  loadBlog={loadBlog}
                />
              </div>
              <div className="col-lg-4">
                <Sidebar />
              </div>
            </div>
            <Spacing md="135" lg="100" />
            <h2 className="mb-0 cs_fs_40 cs_medium">Related Articles</h2>
            <Spacing md="57" />
            <div className="row cs_gap_y_40">
              {blogs?.map((item, index) => (
                <div className="col-xl-4 col-md-6" key={index}>
                  <Post
                    title={item.title}
                    description={item.description}
                    coverImageUrl={item.coverImageUrl}
                    createdAt={item.createdAt}
                    createdBy={item.createdBy}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Spacing md="200" xl="150" lg="110" />
      <Section className="cs_footer_margin_0">
        <BannerSectionStyle9
          title="Don’t Let Your Health <br />Take a Backseat!"
          subTitle="Schedule an appointment with one of our experienced <br />medical professionals today!"
        />
      </Section>
    </>
  );
}
