// src/hooks/useSearch.ts
import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { setSearchQuery } from "../../store/search/searchSlice";

const useSearch = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Access the current search query from Redux
  const searchQuery = useAppSelector((state: RootState) => state.search.query);

  // Local state for the search input
  const [search, setSearch] = useState<string>(searchQuery || "");

  // Handler to perform the search action
  const handleSearch = useCallback(() => {
    const trimmedValue = search.trim();
    dispatch(setSearchQuery(trimmedValue));

    navigate(`/eshop/result?query=${encodeURIComponent(trimmedValue)}`);
  }, [dispatch, navigate, search]);

  // Handler for key press events in the search input
  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  // Handler to clear the search input
  const handleClearSearch = useCallback(() => {
    setSearch("");
    dispatch(setSearchQuery(""));

    if (location.pathname !== "/eshop") {
      navigate("/eshop");
    }
  }, [dispatch, navigate, location.pathname]);

  return {
    search,
    setSearch,
    handleSearch,
    handleKeyPress,
    handleClearSearch,
  };
};

export default useSearch;
