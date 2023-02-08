import { useState, useEffect } from "react";

const getUser = () => Promise.resolve({ id: 1, name: "Rostyslav" });

const Search = ({ value, onChange, children }) => (
  <div>
    <label htmlFor="search">{children}</label>
    <input
      id="search"
      type="text"
      value={value}
      onChange={onChange}
      placeholder=""
      alt=""
    />
  </div>
);

export const App = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const user = await getUser();
      setUser(user);
    };
    loadUser();
  }, []);

  const handleChange = ({ target: { value } }) => setSearch(() => value);

  return (
    <div>
      {user && <h2>Logged in as {user.name}</h2>}
      <Search value={search} onChange={handleChange}>
        Search:
      </Search>
      <p>Searches for {search ? search : ""}</p>
    </div>
  );
};
