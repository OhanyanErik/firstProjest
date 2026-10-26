import { useEffect, useRef } from "react";
import { useLanguage } from "../../../LanguageContext";
import searchBtn from "../../../assets/search.svg";
import "./SearchButton.css";

export default function Search({ search, onSearchChange }) {
  const inputRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="search-box">
      <img src={searchBtn} alt="" />

      <input
        ref={inputRef}
        type="search"
        placeholder={t("search.placeholder")}
        aria-label={t("search.placeholder")}
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
  );
}
