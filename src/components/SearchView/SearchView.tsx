import React, { FC, useContext, useEffect, useState } from "react";
import { List, ListItem, Searchbar } from "framework7-react";
import "./SearchView.css";
import { Banner } from "../Banner/Banner";
import { Spinner } from "../Spinner/Spinner";
import { AppContext } from "../../contexts/AppContext";

interface SearchViewProps {
  error: string;
  isLoading: boolean;
  onChange: (event: any) => void;
  onClear: () => void;
  onClickSuggestion: (value: string) => void;
}

export const SearchView: FC<SearchViewProps> = ({
  error,
  isLoading,
  onChange,
  onClear,
  onClickSuggestion,
}) => {
  const { searchStore } = useContext(AppContext);
  const [searches, setSearches] = useState<string[]>([]);

  useEffect(() => {
    searchStore.getSearches().then((searches) => setSearches(searches));
  }, []);

  return (
    <>
      <Searchbar
        placeholder="Enter town, city or postcode..."
        onChange={onChange}
        onClickClear={onClear}
        onClickDisable={onClear}
      />
      {error && <Banner message={error} type="error" />}
      {isLoading ? (
        <Spinner />
      ) : (
        <List className="suggestions">
          {searches.map((search) => (
            <ListItem key={search}>
              <button
                className="suggestion"
                onClick={() => onClickSuggestion(search)}
              >
                {search}
              </button>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};
