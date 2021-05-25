import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { AppState } from "../store/rootStore";
import { AppActions } from "../store/models/actions";
import { ICategory } from "../store/search/models/interfaces/ICategory";
import { IResult } from "../store/search/models/interfaces/IResult";
import { loadCategoryItems } from "../store/search/SearchActions";
import SearchList from "./SearchList";
import SearchHeader from "./SearchHeader";
import useSearch from "../hooks/useSearch";

import "./Search.css";

interface LinkStateProps {
    searchResults: IResult[];
};

interface LinkDispatchProps {
    loadCategoryItems: (category: ICategory, searchText: string) => void;
};

type LinkProps = LinkStateProps & LinkDispatchProps;

const mapStateToProps = (state: AppState): LinkStateProps => ({
    searchResults: state.searchReducer.searchResults,
});

const mapDispatchToProps = (
    dispatch: ThunkDispatch<AppState, {}, AppActions>
) => ({
    loadCategoryItems: bindActionCreators(loadCategoryItems, dispatch),
});

const Search: React.FC<LinkProps> = (props) => {
    const { searchResults, loadCategoryItems } = props;

    const { onSelectedCategoryChange, onSearch, onTextChange } = useSearch(loadCategoryItems);
    return (
        <div className="search">
            <SearchHeader fetchSearchRequest={onSearch} onTextChange={onTextChange} onSelectedCategoryChange={onSelectedCategoryChange} />
            {searchResults.length ?
                <SearchList items={searchResults} /> :
                <div>По вашему запросу ничего не найдено</div>
            }
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
