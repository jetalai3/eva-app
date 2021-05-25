import { ISystem } from "./ISystem";

export const FETCH_SYSTEM_REQUEST = "FETCH_SYSTEM_REQUEST";
export const FETCH_SYSTEM_SUCCESS = "FETCH_SYSTEM_SUCCESS";
export const FETCH_SYSTEM_FAILURE = "FETCH_SYSTEM_FAILURE";

interface ISystemAsync {
    loading: boolean;
};

interface IFetchSystemRequest extends ISystemAsync {
    type: typeof FETCH_SYSTEM_REQUEST;
};

interface IFetchSystemSuccess extends ISystemAsync {
    type: typeof FETCH_SYSTEM_SUCCESS;
    system: ISystem;
};

interface IFetchSystemFailure extends ISystemAsync {
    type: typeof FETCH_SYSTEM_FAILURE;
    error: string;
};

export type SystemActionTypes = IFetchSystemRequest | IFetchSystemSuccess | IFetchSystemFailure;
