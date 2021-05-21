import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { AppState } from "../store/rootStore";
import { AppActions } from "../store/models/actions";

import SearchHeader from "./SearchHeader";
import { ICategory } from "../store/search/models/interfaces/ICategory";
import { IResult } from "../store/search/models/interfaces/IResult";
import { loadCategoryItems } from "../store/search/SearchActions";
import SearchList from "./SearchList";

import "./Search.css";
import { SEARCH_OPTIONS } from "../common/constants";

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

    const [selectedCategory, setSelectedCategory] = useState(SEARCH_OPTIONS[0]);
    const [searchText, setSearchText] = useState("");

    const onSelectedCategoryChange = useCallback((event) => {
        setSelectedCategory(SEARCH_OPTIONS.find(item => event.target.value === item.value) || SEARCH_OPTIONS[0]);
    }, [setSelectedCategory]);

    const onSearch = useCallback(() => {
        loadCategoryItems(selectedCategory, searchText);
    }, [loadCategoryItems, selectedCategory, searchText]);

    const onTextChange = useCallback((event) => {
        setSearchText(event.target.value);
    }, [setSearchText]);

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
