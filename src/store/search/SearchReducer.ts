import {
    SearchActionTypes,
    FETCH_SEARCH_REQUEST,
    FETCH_SEARCH_SUCCESS,
    FETCH_SEARCH_FAILURE,
} from './models/actions';

import { IResult } from './models/searchInterface';

export interface SearchState {
    loading: boolean;
    searchResults: IResult[];
    error: string;
}

const defaultState: SearchState = {
    loading: false,
    searchResults: [],
    error: '',
};

export const searchReducer = (
    state = defaultState,
    action: SearchActionTypes
): SearchState => {
    switch (action.type) {
        case FETCH_SEARCH_REQUEST:
            return { loading: true, searchResults: [], error: '' };
        case FETCH_SEARCH_SUCCESS:
            return { loading: false, searchResults: action.searchResults, error: '' };
        case FETCH_SEARCH_FAILURE:
            return { loading: false, searchResults: [], error: action.error };
        default:
            return state;
    }
};
