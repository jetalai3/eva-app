import { IFaction } from './factionsInterface';

export const FETCH_FACTIONS_REQUEST = "FETCH_FACTIONS_REQUEST";
export const FETCH_FACTIONS_SUCCESS = "FETCH_FACTIONS_SUCCESS";
export const FETCH_FACTIONS_FAILURE = "FETCH_FACTIONS_FAILURE";

interface IFactionAsync {
    loading: boolean;
    factions: IFaction[];
    error: string;
};

interface IFetchFactionsRequest extends IFactionAsync {
    type: typeof FETCH_FACTIONS_REQUEST;
};

interface IFetchFactionsSuccess extends IFactionAsync {
    type: typeof FETCH_FACTIONS_SUCCESS;
};

interface IFetchFactionsFailure extends IFactionAsync {
    type: typeof FETCH_FACTIONS_FAILURE;
};

export type FactionActionTypes = IFetchFactionsRequest | IFetchFactionsSuccess | IFetchFactionsFailure;
