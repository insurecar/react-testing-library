import { useContext, createContext, useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, toggleLoginStatus] = useState(false);
  const toogleLogin = () => toggleLoginStatus((prev) => !prev);

  return (
    <AuthContext.Provider value={{ toogleLogin, isLoggedIn }}>
      <div>Message: {children}</div>
    </AuthContext.Provider>
  );
};

const ConsumerComponent = () => {
  const { isLoggedIn, toogleLogin } = useContext(AuthContext);
  return (
    <>
      <input type="button" value="Login" onClick={toogleLogin} />
      {isLoggedIn ? "Welcome" : "Please, log in"}
    </>
  );
};

describe("Context", () => {
  it("ConsumerComponent shows default value", () => {
    render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );
    expect(screen.getByText(/^Message:/i)).toHaveTextContent(
      "Message: Please, log in"
    );
  });

  it("ConsumerComponent toggle value", () => {
    render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );
    expect(screen.getByText(/^Message:/i)).toHaveTextContent(
      "Message: Please, log in"
    );
    userEvent.click(screen.getByRole("button"));

    expect(screen.getByText(/^Message:/i)).toHaveTextContent(
      "Message: Welcome"
    );
  });
});
