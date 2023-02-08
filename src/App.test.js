import { render, screen, fireEvent, getByText } from "@testing-library/react";
import { App } from "./App";
import userEvent from "@testing-library/user-event";

describe("App", () => {
  it("renders App component", async () => {
    render(<App />);
    await screen.findByText(/Logged in as/i);
    expect(screen.queryByText(/Searches for React/i)).toBeNull();
    // fireEvent.change(screen.getByRole("textbox"), {
    //   target: { value: "React" },
    // });

    userEvent.type(screen.getByRole("textbox"), "React");
    expect(screen.getByText(/Searches for react/i)).toBeInTheDocument();
  });
});

describe("events", () => {
  it("checkbox click", () => {
    const handleChange = jest.fn();
    const { container } = render(
      <input type="checkbox" onChange={handleChange} />
    );
    const checkbox = container.firstChild;

    expect(container).not.toBeChecked();
    userEvent.click(checkbox);
    userEvent.click(checkbox, { ctrlKey: true, shiftKey: false });

    expect(handleChange).toHaveBeenCalledTimes(2);
    fireEvent.click(checkbox);

    expect(container).toMatchSnapshot();
  });

  it("double click", () => {
    const onChange = jest.fn();
    render(<input type="checkbox" placeholder="" onChange={onChange} />);

    const input = screen.getByPlaceholderText("");
    userEvent.dblClick(input);
    expect(input).not.toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("focus", () => {
    render(
      <div>
        <input data-testid="element" type="checkbox" />
        <input data-testid="element" type="radio" />
        <input data-testid="element" type="number" />
      </div>
    );

    const [checkbox, radio, number] = screen.getAllByTestId("element");
    userEvent.tab();
    expect(checkbox).toHaveFocus();
    userEvent.tab();
    expect(radio).toHaveFocus();
    userEvent.tab();
    expect(number).toHaveFocus();
  });

  it("select option single", () => {
    render(
      <select>
        <option value="1">A</option>
        <option value="2">B</option>
        <option value="3">C</option>
      </select>
    );

    userEvent.selectOptions(screen.getByRole("combobox"), "1");
    expect(screen.getByText("A").selected).toBeTruthy();

    userEvent.selectOptions(screen.getByRole("combobox"), "2");
    expect(screen.getByText("B").selected).toBeTruthy();
    expect(screen.queryByText("A").selected).toBeFalsy();
  });

  it("select option multiselect", () => {
    render(
      <select multiple>
        <option value="1">A</option>
        <option value="2">B</option>
        <option value="3">C</option>
      </select>
    );

    userEvent.selectOptions(screen.getByRole("listbox"), "1");
    expect(screen.getByText("A").selected).toBeTruthy();
    expect(screen.queryByText("B").selected).toBeFalsy();
    expect(screen.queryByText(/c/i).selected).toBeFalsy();

    userEvent.selectOptions(screen.getByRole("listbox"), "2");
    userEvent.selectOptions(screen.getByRole("listbox"), "3");
    expect(screen.getByText(/b/i).selected).toBeTruthy();
    expect(screen.getByText(/c/i).selected).toBeTruthy();
    expect(screen.getByText("A").selected).toBeTruthy();
  });
});
