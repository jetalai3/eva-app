import { IRace } from "./IRace";

export const FETCH_RACES_REQUEST = "FETCH_RACES_REQUEST";
export const FETCH_RACES_SUCCESS = "FETCH_RACES_SUCCESS";
export const FETCH_RACES_FAILURE = "FETCH_RACES_FAILURE";

interface IRacesAsync {
    loading: boolean;
    races: IRace[];
};

interface IFetchRacesRequest extends IRacesAsync {
    type: typeof FETCH_RACES_REQUEST;
};

interface IFetchRacesSuccess extends IRacesAsync {
    type: typeof FETCH_RACES_SUCCESS;
};

interface IFetchRacesFailure extends IRacesAsync {
    type: typeof FETCH_RACES_FAILURE;
    error: string;
};

export type RacesActionTypes = IFetchRacesRequest | IFetchRacesSuccess | IFetchRacesFailure;
