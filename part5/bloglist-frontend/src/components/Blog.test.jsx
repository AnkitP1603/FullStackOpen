import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const blog = {
  title: "Test Blog Title",
  author: "Test Author",
  url: "http://testblog.com",
  likes: 5,
  user: {
    username: "testuser",
    id: "693fcdcf4ce9526941863664",
  },
  id: "69428fecfde0f660a9b8b64f",
};

describe("<Blog />", () => {
  beforeEach(() => {
    const user = {
      username: "testuser",
      id: "693fcdcf4ce9526941863664",
    };
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
  });

  test("renders blog's title and author by default", () => {
    render(<Blog blog={blog} handleLike={() => {}} handleRemove={() => {}} />);

    const title = screen.getByText("Test Blog Title");
    expect(title).toBeDefined();

    const author = screen.getByText("Test Author");
    expect(author).toBeDefined();

    const url = screen.queryByText("http://testblog.com");
    expect(url).toBeNull();

    const likes = screen.queryByText("likes 5");
    expect(likes).toBeNull();
  });

  test("shows url and likes when the view button is clicked", async () => {
    render(<Blog blog={blog} handleLike={() => {}} handleRemove={() => {}} />);

    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const url = screen.getByText("http://testblog.com");
    expect(url).toBeDefined();

    const likes = screen.getByText("likes 5");
    expect(likes).toBeDefined();
  });

  test("calls the like handler twice when the like button is clicked twice", async () => {
    const mockLikeHandler = vi.fn();
    render(
      <Blog blog={blog} handleLike={mockLikeHandler} handleRemove={() => {}} />,
    );

    const user = userEvent.setup();
    await user.click(screen.getByText("view"));

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockLikeHandler).toHaveBeenCalledTimes(2);
  });

  afterEach(() => {
    window.localStorage.clear();
  });
});
