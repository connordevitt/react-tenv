import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";

test("renders Add button", () => {
  render(<HomePage />);
  const addButton = screen.getByRole("button", { name: /Add/i }); // Look for a button with the text "Add"
  expect(addButton).toBeInTheDocument();
});
