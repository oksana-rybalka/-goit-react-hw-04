import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (query.trim() === "") {
      toast.error("Please enter a search term!", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        borderRadius: "10px",
        style: {
          fontSize: "20px",
          color: "red",
        },
      });
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
          placeholder="What are you hunting for?"
        />
        <button className={styles.submitBtn} type="submit">
          Start the hunt
        </button>
      </form>
    </header>
  );
};
export default SearchBar;
