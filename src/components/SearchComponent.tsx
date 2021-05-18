import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { AppState } from '../store/rootStore';
import { AppActions } from '../store/models/actions';

import SearchHeader from "./SearchHeader";
import { ICategory, IResult } from "../store/search/models/searchInterface";
import { boundRequestResults } from "../store/search/SearchActions";
import SearchList from "./SearchList";

interface Props { }

interface LinkStateProps {
    searchResults: IResult[];
}

interface LinkDispatchProps {
    boundRequestResults: (category: ICategory, searchText: string) => void;
}

type LinkProps = Props & LinkStateProps & LinkDispatchProps;

const mapStateToProps = (state: AppState): LinkStateProps => ({
    searchResults: state.searchReducer.searchResults,
});

const mapDispatchToProps = (
    dispatch: ThunkDispatch<AppState, {}, AppActions>
) => ({
    boundRequestResults: bindActionCreators(boundRequestResults, dispatch),
});

const SearchComponent: React.FC<LinkProps> = (props) => {
    const { searchResults, boundRequestResults } = props;

    return (
        <div>
            <SearchHeader fetchSearchRequest={boundRequestResults} />
            {searchResults.length ?
                <SearchList items={searchResults} /> :
                <div>По вашему запросу ничего не найдено</div>
            }
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
