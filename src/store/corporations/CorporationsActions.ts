import { Dispatch } from "redux";

import { AppActions } from "../models/actions";

import {
    FETCH_CORPORATION_REQUEST,
    FETCH_CORPORATION_SUCCESS,
    FETCH_CORPORATION_FAILURE,
} from "./actions";

import { CORPORATION_REQUEST_LINK } from "../../common/constants";

import { ICorporation } from "./ICorporation";
import loadEntityById from "../../common/loadEntityById";

const requestCorporation = (): AppActions => ({
    type: FETCH_CORPORATION_REQUEST,
    loading: true,
});
const receiveCorporation = (corporation: ICorporation): AppActions => ({
    type: FETCH_CORPORATION_SUCCESS,
    loading: false,
    corporation: corporation,
});
const invalidateCorporation = (errorText: string): AppActions => ({
    type: FETCH_CORPORATION_FAILURE,
    loading: false,
    error: `Unable to fetch corporation. ${errorText} `,
});

export const loadCorporation = (id: number) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(requestCorporation());
        try {
            const corporation = await loadEntityById<ICorporation>(CORPORATION_REQUEST_LINK, id);
            dispatch(receiveCorporation(corporation));
        } catch (error) {
            dispatch(invalidateCorporation(error))
        };
    };
};
