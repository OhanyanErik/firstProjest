import { useEffect, useRef } from "react";
import searchBtn from "../../../assets/search.svg";
import "./SearchButton.css";

export default function Search({ search, onSearchChange }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="search-box">
      <img src={searchBtn} alt="" />

      <input
        ref={inputRef}
        type="search"
        placeholder="Search applications..."
        aria-label="Search applications"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
  );
}