import { IResult } from "./interfaces/IResult";

export const FETCH_SEARCH_REQUEST = "FETCH_SEARCH_REQUEST";
export const FETCH_SEARCH_SUCCESS = "FETCH_SEARCH_SUCCESS";
export const FETCH_SEARCH_FAILURE = "FETCH_SEARCH_FAILURE";

interface ISearchAsync {
    loading: boolean;
    searchResults: IResult[];
    error: string;
};

interface IFetchSearchRequest extends ISearchAsync {
    type: typeof FETCH_SEARCH_REQUEST;
};

interface IFetchSearchSuccess extends ISearchAsync {
    type: typeof FETCH_SEARCH_SUCCESS;
};

interface IFetchSearchFailure extends ISearchAsync {
    type: typeof FETCH_SEARCH_FAILURE;
};

export type SearchActionTypes = IFetchSearchRequest | IFetchSearchSuccess | IFetchSearchFailure;
