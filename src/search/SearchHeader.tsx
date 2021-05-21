import React from "react";
import DropDown from "../components/DropDown";
import { SEARCH_OPTIONS } from "../common/constants";

type SearchHeaderProps = {
    fetchSearchRequest: () => void;
    onTextChange: (event: React.ChangeEvent) => void;
    onSelectedCategoryChange: (event: React.ChangeEvent) => void;
};

const SearchHeader: React.FC<SearchHeaderProps> = ({ fetchSearchRequest, onTextChange, onSelectedCategoryChange }) => {
    return (
        <div className="search-header">
            <DropDown items={SEARCH_OPTIONS} onChange={onSelectedCategoryChange} />
            <input className="form-control" type="text" onChange={onTextChange} />
            <button className="btn btn-secondary" onClick={fetchSearchRequest}>Search</button>
        </div>
    );
};

export default SearchHeader;
