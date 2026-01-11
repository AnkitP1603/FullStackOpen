import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateBlogForm from "./CreateBlogForm";

describe("<CreateBlogForm />", () => {
  test("calls the event handler it received as props with the right details when a new blog is created", async () => {
    const mockCreateBlogHandler = vi.fn();

    render(<CreateBlogForm handleCreateBlog={mockCreateBlogHandler} />);

    const user = userEvent.setup();

    const titleInput = screen.getByLabelText("title:");
    const authorInput = screen.getByLabelText("author:");
    const urlInput = screen.getByLabelText("url:");
    const createButton = screen.getByText("create");

    await user.type(titleInput, "Test Blog Title");
    await user.type(authorInput, "Test Author");
    await user.type(urlInput, "http://testblog.com");
    await user.click(createButton);

    expect(mockCreateBlogHandler.mock.calls).toHaveLength(1);
    expect(mockCreateBlogHandler.mock.calls[0][0]).toEqual({
      title: "Test Blog Title",
      author: "Test Author",
      url: "http://testblog.com",
    });
  });
});
