import {
    SystemActionTypes,
    FETCH_SYSTEM_REQUEST,
    FETCH_SYSTEM_SUCCESS,
    FETCH_SYSTEM_FAILURE,
} from "./actions";
import { ISystem } from "./ISystem";

export interface SystemState {
    loading: boolean;
    systems: ISystem[];
    error: string;
}

const defaultState: SystemState = {
    loading: false,
    systems: [],
    error: "",
};

export const systemsReducer = (
    state = defaultState,
    action: SystemActionTypes
): SystemState => {
    switch (action.type) {
        case FETCH_SYSTEM_REQUEST:
            return { loading: true, systems: state.systems, error: "" };
        case FETCH_SYSTEM_SUCCESS:
            return { loading: false, systems: [...state.systems, action.system], error: "" };
        case FETCH_SYSTEM_FAILURE:
            return { loading: false, systems: state.systems, error: action.error };
        default:
            return state;
    };
};
