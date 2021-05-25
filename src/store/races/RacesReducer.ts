import {
    RacesActionTypes,
    FETCH_RACES_REQUEST,
    FETCH_RACES_SUCCESS,
    FETCH_RACES_FAILURE,
} from "./actions";

import { IRace } from "./IRace";

export interface RacesState {
    loading: boolean;
    races: IRace[];
    error: string;
}

const defaultState: RacesState = {
    loading: false,
    races: [],
    error: "",
};

export const racesReducer = (
    state = defaultState,
    action: RacesActionTypes
): RacesState => {
    switch (action.type) {
        case FETCH_RACES_REQUEST:
            return { loading: true, races: [], error: "" };
        case FETCH_RACES_SUCCESS:
            return { loading: false, races: action.races, error: "" };
        case FETCH_RACES_FAILURE:
            return { loading: false, races: [], error: action.error };
        default:
            return state;
    };
};
