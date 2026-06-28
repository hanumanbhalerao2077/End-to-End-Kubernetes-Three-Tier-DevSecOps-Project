import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the todo board heading", () => {
  render(<App />);
  const heading = screen.getByText(/Production Todo Board/i);
  expect(heading).toBeInTheDocument();
});
