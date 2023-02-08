import { render, screen } from "@testing-library/react";
import { App } from "./App";

describe("App", () => {
  it("renders App component", () => {
    render(<App />);
    expect(screen.getByText(/Search:/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("")).toBeInTheDocument();
    expect(screen.getByAltText("")).toBeInTheDocument();
    expect(screen.getByDisplayValue("")).toBeInTheDocument();
    // expect(screen)
    // expect(screen.getByRole("textbox")).toBeInTheDocument();
    // expect(screen.getByRole("textbox")).toBeInTheDocument();
    // expect(screen.getByRole("textbox")).toBeInTheDocument();
    screen.getByLabelText(/search/i);
  });
});
