import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import CreateBlogForm from "./components/CreateBlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [notifType, setNotifType] = useState("");

  const createBlogFormRef = useRef();

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await blogService.getAllBlogs();
      const sortedBlogs = [...res].sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      console.log(user);

      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");

      setMessage(`Welcome ${user.username}`);
      setNotifType("success");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch {
      setMessage("Wrong username or password");
      setNotifType("error");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    setMessage("Logged out successfully");
    setNotifType("success");
  };

  const handleCreateBlog = async (newBlog) => {
    createBlogFormRef.current.toggleVisibility();

    const createdBlog = await blogService.createBlog(newBlog);
    setBlogs((prevBlogs) => [...prevBlogs, createdBlog]);

    setMessage(
      `A new blog ${createdBlog.title} by ${createdBlog.author} added`,
    );
    setNotifType("success");
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleLike = async (blog) => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    await blogService.updateBlog(blog.id, updatedBlog);
    setBlogs(
      blogs
        .map((b) => (b.id === blog.id ? { ...blog, likes: blog.likes + 1 } : b))
        .sort((a, b) => b.likes - a.likes),
    );
  };

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteBlog(blog.id);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification message={message} type={notifType} />

        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              ></input>
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              ></input>
            </label>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={message} type={notifType} />

      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>

      <Togglable buttonLabel="create new blog" ref={createBlogFormRef}>
        <CreateBlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
        />
      ))}
    </div>
  );
};

export default App;
