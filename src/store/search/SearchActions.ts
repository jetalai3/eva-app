import { Dispatch } from "redux";

import { AppActions } from "../models/actions";
import { ICategory } from "./models/interfaces/ICategory";
import { IResult } from "./models/interfaces/IResult";

import {
    FETCH_SEARCH_REQUEST,
    FETCH_SEARCH_SUCCESS,
    FETCH_SEARCH_FAILURE,
} from "./models/actions";
import { MAIN_URL, SEARCH_REQUEST_LINK } from "../../common/constants";
import fetchResponse from "../../common/fetchResponse";

const requestSearchResults = (): AppActions => ({
    type: FETCH_SEARCH_REQUEST,
    loading: true,
    searchResults: [],
    error: "",
});
const receiveSearchResults = (searchResults: IResult[]): AppActions => ({
    type: FETCH_SEARCH_SUCCESS,
    loading: false,
    searchResults: searchResults,
    error: "",
});
const invalidateSearchResults = (errorText: string): AppActions => ({
    type: FETCH_SEARCH_FAILURE,
    loading: false,
    searchResults: [],
    error: `Unable to fetch search results. ${errorText} `,
});

export const loadSearchInfo = async (url: string, id: number): Promise<IResult> => {
    const newUrl = new URL(url + id, MAIN_URL);
    const searchResponse = await fetchResponse(newUrl.toString());
    const result: IResult = {id: id, name: searchResponse.name};
    return result;
};

export const loadCategoryItems = (category: ICategory, searchText: string) => {
    return async (dispatch: Dispatch<AppActions>) => {
        const url = new URL(SEARCH_REQUEST_LINK);
        url.searchParams.set("categories", category.value);
        url.searchParams.set("search", searchText);
        dispatch(requestSearchResults());
        try {
            const searchIds = (await fetchResponse(url.toString()))[category.value];
            const resultItems: IResult[] = await Promise.all(searchIds.map((id: number) => loadSearchInfo(category.url, id)));
            dispatch(receiveSearchResults(resultItems));
        } catch(error) {
            dispatch(invalidateSearchResults(error));
        };
    };
};