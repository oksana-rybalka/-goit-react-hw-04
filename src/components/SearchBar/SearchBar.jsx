import { useState } from "react";
import { Toaster } from "react-hot-toast";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (query.trim() === "") {
      Toaster.error("Please enter a search term.");
      return;
    }

    onSubmit(query);
    setQuery("");
  };
  return (
    <header>
      <Toaster />
      <form className={styles.searchImgForm} onSubmit={handleSubmit}>
        <input
          className={styles.inputImg}
          type="text"
          value={query}
          onChange={handleInputChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={styles.submitBtn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};
export default SearchBar;
