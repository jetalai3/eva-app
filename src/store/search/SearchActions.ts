import { Dispatch } from 'redux';

import { AppActions } from "../models/actions";
import { IResult } from './models/searchInterface';

import {
    FETCH_SEARCH_REQUEST,
    FETCH_SEARCH_SUCCESS,
    FETCH_SEARCH_FAILURE,
} from './models/actions';
import { MAIN_URL, SEARCH_REQUEST_LINK } from '../../api';


const requestSearchResults = (): AppActions => ({
    type: FETCH_SEARCH_REQUEST,
    loading: true,
    searchResults: [],
    error: '',
});
const receiveSearchResults = (searchResults: IResult[]): AppActions => ({
    type: FETCH_SEARCH_SUCCESS,
    loading: false,
    searchResults: searchResults,
    error: '',
});
const invalidateSearchResults = (errorText: string): AppActions => ({
    type: FETCH_SEARCH_FAILURE,
    loading: false,
    searchResults: [],
    error: `Unable to fetch search results. ${errorText} `,
});

const parseResponse = async (url: string) => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const jsonValue = await response.json();
            return Promise.resolve(jsonValue);
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log(error)
    }
}

export const boundRequestResults = (category: { title: string, url: string, value: string }, searchText: string) => {
    return async (dispatch: Dispatch<AppActions>) => {
        const url = new URL(SEARCH_REQUEST_LINK);
        url.searchParams.set('categories', category.value);
        url.searchParams.set('search', searchText);
        dispatch(requestSearchResults());
        parseResponse(url.toString())
            .then(data => { return data[category.value] })
            .then(async ids => {
                    await Promise.all(ids.map(async (id: number, index: number, array: IResult[]) => {
                        const newUrl = new URL(category.url + id, MAIN_URL)
                        return await parseResponse(newUrl.toString())
                        .then(data => {
                            array[index] = {
                                id: id,
                                name: data.name,
                            }
                        })
                            
                    }));
                    return ids;
            })
            .then((json) => dispatch(receiveSearchResults(json)))
            .catch((error) => dispatch(invalidateSearchResults(error)));
    };
};