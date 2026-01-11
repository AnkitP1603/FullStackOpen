import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, handleLike, handleRemove }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    padding: 5,
  };

  return (
    <div style={blogStyle} className="blog">
      <div>
        <span>{blog.title} </span>
        <span>{blog.author}</span>
        <button onClick={() => setVisible(!visible)}>
          {visible ? "hide" : "view"}
        </button>
      </div>

      {visible && (
        <div className="blog-details">
          <div>{blog.url}</div>
          <div className="blog-likes">
            <span>likes {blog.likes}</span>
            <button onClick={() => handleLike(blog)}>like</button>
          </div>
          <div>{blog.user.username}</div>

          {blog.user.id ===
            JSON.parse(window.localStorage.getItem("loggedBlogappUser")).id && (
            <button onClick={() => handleRemove(blog)}>remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
