import {
    CeoActionTypes,
    FETCH_CEO_REQUEST,
    FETCH_CEO_SUCCESS,
    FETCH_CEO_FAILURE,
} from "./actions";
import { ICeo } from "./ICeo";

export interface CeoState {
    loading: boolean;
    ceos: ICeo[];
    error: string;
}

const defaultState: CeoState = {
    loading: false,
    ceos: [],
    error: "",
};

export const ceoReducer = (
    state = defaultState,
    action: CeoActionTypes
): CeoState => {
    switch (action.type) {
        case FETCH_CEO_REQUEST:
            return { loading: true, ceos: state.ceos, error: "" };
        case FETCH_CEO_SUCCESS:
            return { loading: false, ceos: [...state.ceos, action.ceo], error: "" };
        case FETCH_CEO_FAILURE:
            return { loading: false, ceos: state.ceos, error: action.error };
        default:
            return state;
    };
};
