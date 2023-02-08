import { useState } from "react";

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

  const handleChange = ({ target: { value } }) => setSearch(() => value);

  return (
    <div>
      <Search value={search} onChange={handleChange}>
        Search:
      </Search>
      <p>Searches for {search ? search : ""}</p>
    </div>
  );
};
