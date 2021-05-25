import { Dispatch } from "redux";

import { AppActions } from "../models/actions";

import {
    FETCH_SYSTEM_REQUEST,
    FETCH_SYSTEM_SUCCESS,
    FETCH_SYSTEM_FAILURE,
} from "./actions";

import { SYSTEM_REQUEST_LINK } from "../../common/constants";

import { ISystem } from "./ISystem";
import loadEntityById from "../../common/loadEntityById";

const requestSystem = (): AppActions => ({
    type: FETCH_SYSTEM_REQUEST,
    loading: true,
});
const receiveSystem = (system: ISystem): AppActions => ({
    type: FETCH_SYSTEM_SUCCESS,
    loading: false,
    system: system,
});
const invalidateSystem = (errorText: string): AppActions => ({
    type: FETCH_SYSTEM_FAILURE,
    loading: false,
    error: `Unable to fetch system. ${errorText} `,
});

export const loadSystem = (id: number) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(requestSystem());
        try {
            const system = await loadEntityById<ISystem>(SYSTEM_REQUEST_LINK, id);
            dispatch(receiveSystem(system));
        } catch (error) {
            dispatch(invalidateSystem(error))
        };
    };
};
