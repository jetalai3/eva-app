import {
    FactionActionTypes,
    FETCH_FACTIONS_REQUEST,
    FETCH_FACTIONS_SUCCESS,
    FETCH_FACTIONS_FAILURE,
} from "./models/actions";

import { IFaction } from "./models/interfaces/IFaction";

export interface FactionState {
    loading: boolean;
    factions: IFaction[];
    error: string;
}

const defaultState: FactionState = {
    loading: false,
    factions: [],
    error: "",
};

export const factionsReducer = (
    state = defaultState,
    action: FactionActionTypes
): FactionState => {
    switch (action.type) {
        case FETCH_FACTIONS_REQUEST:
            return { loading: true, factions: [], error: "" };
        case FETCH_FACTIONS_SUCCESS:
            return { loading: false, factions: action.factions, error: "" };
        case FETCH_FACTIONS_FAILURE:
            return { loading: false, factions: [], error: action.error };
        default:
            return state;
    };
};
