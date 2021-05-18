import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { AppState } from '../store/rootStore';
import { AppActions } from '../store/models/actions';

import SearchHeader from "./SearchHeader";
import { IResult } from "../store/search/models/searchInterface";
import { boundRequestResults } from "../store/search/SearchActions";

interface Props { }

interface LinkStateProps {
    searchResults: IResult[];
}

interface LinkDispatchProps {
    boundRequestResults: (category: { title: string, url: string, value: string }, searchText: string) => void;
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
            {searchResults.map(result => <div>
                <span>
                    ID: {result.id} |
                </span>
                <span>
                    Name: {result.name}
                </span>
            </div>)}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
