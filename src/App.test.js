import { render, screen } from "@testing-library/react";
import { App } from "./App";
it("renders learn react link", async () => {
  render(<App />);
  // expect(screen.queryByText(/Searches for React/i)).toBeNull();
  expect(screen.queryByText(/Loged in as/i)).toBeNull();
  expect(await screen.findByText(/Logged in as/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/search/i)).not.toBeRequired();
  expect(screen.getByLabelText(/search/i)).toBeEmpty();
  expect(screen.getByLabelText(/search/i)).toHaveAttribute("id");

});
