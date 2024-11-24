import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("addPost should add a new post to the list", () => {
  // Render แอปพลิเคชัน
  render(<App />);

  // กด Login ก่อน
  fireEvent.click(screen.getByText("Login"));

  // ป้อนข้อมูลโพสต์ใหม่
  const titleInput = screen.getByPlaceholderText("Post title");
  const contentInput = screen.getByPlaceholderText("Post content");
  const addButton = screen.getByText("Add Post");

  fireEvent.change(titleInput, { target: { value: "Test Post" } });
  fireEvent.change(contentInput, { target: { value: "This is a test post" } });
  fireEvent.click(addButton);

  // ตรวจสอบว่าโพสต์ใหม่ปรากฏในหน้า
  expect(screen.getByText("Test Post")).toBeInTheDocument();
  expect(screen.getByText("This is a test post")).toBeInTheDocument();
});
