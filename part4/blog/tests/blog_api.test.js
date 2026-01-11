import supertest from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import assert from "node:assert";
import { describe, test, beforeEach, after, before } from "node:test";
import Blog from "../models/blog.js";
import User from "../models/user.js";
import helper from "../utils/test_helper.js";

const api = supertest(app);

before(async () => {
  await User.deleteMany({});
  const user = {
    username: "testuser",
    name: "Test User",
    password: "testpassword",
  };
  await api
    .post("/api/users")
    .send(user)
    .expect(201)
    .expect("Content-Type", /application\/json/);
});

describe("when there is initially some notes saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    const user = await User.findOne({ username: "testuser" });
    const blogsWithUser = helper.initialBlogs.map((blog) => ({
      ...blog,
      user: user._id,
    }));
    await Blog.insertMany(blogsWithUser);
  });

  test("correct number of blogs are returned as json", async () => {
    const res = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(res.body.length, helper.initialBlogs.length);
  });

  test("unique identifier property of the blog posts is named id", async () => {
    const res = await helper.blogsInDb();

    res.forEach((blog) => {
      assert.ok(blog.id);
    });
  });

  describe("addition of a new blog", () => {
    test("a valid blog can be added", async () => {
      const loginUser = {
        username: "testuser",
        password: "testpassword",
      };

      const loginRes = await api
        .post("/api/login")
        .send(loginUser)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const newBlog = {
        title: "New Blog Post",
        author: "John Doe",
        url: "http://example.com/new-blog-post",
        likes: 10,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `Bearer ${loginRes.body.token}`)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

      const titles = blogsAtEnd.map((b) => b.title);
      assert.ok(titles.includes("New Blog Post"));
    });

    test("if likes property is missing, it will default to 0", async () => {
      const loginUser = {
        username: "testuser",
        password: "testpassword",
      };

      const loginRes = await api
        .post("/api/login")
        .send(loginUser)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const newBlog = {
        title: "Blog Without Likes",
        author: "Jane Doe",
        url: "http://example.com/blog-without-likes",
      };

      const res = await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `Bearer ${loginRes.body.token}`)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(res.body.likes, 0);
    });

    test("blog without title and url is not added", async () => {
      const loginUser = {
        username: "testuser",
        password: "testpassword",
      };

      const loginRes = await api
        .post("/api/login")
        .send(loginUser)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const newBlog = {
        author: "Bad Blog Author",
        likes: 0,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `Bearer ${loginRes.body.token}`)
        .expect(400);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });

    test("adding a blog fails with status code 401 if token is not provided", async () => {
      const newBlog = {
        title: "Unauthorized Blog",
        author: "Hacker",
        url: "http://example.com/unauthorized-blog",
        likes: 5,
      };

      await api.post("/api/blogs").send(newBlog).expect(401);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });
  });

  describe("deletion of a blog", () => {
    test("succeeds with status code 204 if id is valid", async () => {
      const loginUser = {
        username: "testuser",
        password: "testpassword",
      };

      const loginRes = await api
        .post("/api/login")
        .send(loginUser)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", `Bearer ${loginRes.body.token}`)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);

      const titles = blogsAtEnd.map((b) => b.title);
      assert.ok(!titles.includes(blogToDelete.title));
    });
  });

  describe("updating a blog", () => {
    test("succeeds in updating the likes of a blog", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];

      const updatedData = {
        likes: blogToUpdate.likes + 1,
      };

      const res = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedData)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(res.body.likes, blogToUpdate.likes + 1);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
