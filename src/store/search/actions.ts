import { Dispatch } from 'redux';

import { AppActions } from '../models/actions';

import {
    SEARCH_REQUEST_LINK
} from '../../api';

export const FETCH_SEARCH_REQUEST = "FETCH_SEARCH_REQUEST";
export const FETCH_SEARCH_SUCCESS = "FETCH_SEARCH_SUCCESS";
export const FETCH_SEARCH_FAILURE = "FETCH_SEARCH_FAILURE";

interface IResult {
    name: string,
    id: number,
};

interface ISearchAsync {
    loading: boolean;
    result: IResult[];
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

type FactionActionTypes = IFetchSearchRequest | IFetchSearchSuccess | IFetchSearchFailure;



// const requestFactions = (): AppActions => ({
//     type: FETCH_FACTIONS_REQUEST,
//     loading: true,
//     factions: [],
//     error: '',
// });
// const receiveFactions = (factions: IFaction[]): AppActions => ({
//     type: FETCH_FACTIONS_SUCCESS,
//     loading: false,
//     factions: factions,
//     error: '',
// });
// const invalidateFactions = (errorText: string): AppActions => ({
//     type: FETCH_FACTIONS_FAILURE,
//     loading: false,
//     factions: [],
//     error: `Unable to fetch factions. ${errorText} `,
// });