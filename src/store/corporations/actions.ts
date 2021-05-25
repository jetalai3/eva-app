import { ICorporation } from "./ICorporation";

export const FETCH_CORPORATION_REQUEST = "FETCH_CORPORATION_REQUEST";
export const FETCH_CORPORATION_SUCCESS = "FETCH_CORPORATION_SUCCESS";
export const FETCH_CORPORATION_FAILURE = "FETCH_CORPORATION_FAILURE";

interface ICorporationAsync {
    loading: boolean;
};

interface IFetchCorporationRequest extends ICorporationAsync {
    type: typeof FETCH_CORPORATION_REQUEST;
};

interface IFetchCorporationSuccess extends ICorporationAsync {
    type: typeof FETCH_CORPORATION_SUCCESS;
    corporation: ICorporation;
};

interface IFetchCorporationFailure extends ICorporationAsync {
    type: typeof FETCH_CORPORATION_FAILURE;
    error: string;
};

export type CorporationActionTypes = IFetchCorporationRequest | IFetchCorporationSuccess | IFetchCorporationFailure;
