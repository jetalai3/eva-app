import { ICeo } from "./ICeo";

export const FETCH_CEO_REQUEST = "FETCH_CEO_REQUEST";
export const FETCH_CEO_SUCCESS = "FETCH_CEO_SUCCESS";
export const FETCH_CEO_FAILURE = "FETCH_CEO_FAILURE";

interface ICeoAsync {
    loading: boolean;
};

interface IFetchCeoRequest extends ICeoAsync {
    type: typeof FETCH_CEO_REQUEST;
};

interface IFetchCeoSuccess extends ICeoAsync {
    type: typeof FETCH_CEO_SUCCESS;
    ceo: ICeo;
};

interface IFetchCeoFailure extends ICeoAsync {
    type: typeof FETCH_CEO_FAILURE;
    error: string;
};

export type CeoActionTypes = IFetchCeoRequest | IFetchCeoSuccess | IFetchCeoFailure;
