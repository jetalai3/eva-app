import {
    CorporationActionTypes,
    FETCH_CORPORATION_REQUEST,
    FETCH_CORPORATION_SUCCESS,
    FETCH_CORPORATION_FAILURE,
} from "./actions";
import { ICorporation } from "./ICorporation";

export interface CorporationState {
    loading: boolean;
    corporations: ICorporation[];
    error: string;
}

const defaultState: CorporationState = {
    loading: false,
    corporations: [],
    error: "",
};

export const corporationsReducer = (
    state = defaultState,
    action: CorporationActionTypes
): CorporationState => {
    switch (action.type) {
        case FETCH_CORPORATION_REQUEST:
            return { loading: true, corporations: state.corporations, error: "" };
        case FETCH_CORPORATION_SUCCESS:
            return { loading: false, corporations: [...state.corporations, action.corporation], error: "" };
        case FETCH_CORPORATION_FAILURE:
            return { loading: false, corporations: state.corporations, error: action.error };
        default:
            return state;
    };
};
