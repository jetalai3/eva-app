import { Dispatch } from "redux";

import { AppActions } from "../models/actions";

import {
    FETCH_CEO_REQUEST,
    FETCH_CEO_SUCCESS,
    FETCH_CEO_FAILURE,
} from "./actions";

import { CHARACTER_REQUEST_LINK } from "../../common/constants";

import { ICeo } from "./ICeo";
import loadEntityById from "../../common/loadEntityById";

const requestCeo = (): AppActions => ({
    type: FETCH_CEO_REQUEST,
    loading: true,
});
const receiveCeo = (ceo: ICeo): AppActions => ({
    type: FETCH_CEO_SUCCESS,
    loading: false,
    ceo: ceo,
});
const invalidateCeo = (errorText: string): AppActions => ({
    type: FETCH_CEO_FAILURE,
    loading: false,
    error: `Unable to fetch ceo. ${errorText} `,
});

export const loadCeo = (id: number) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(requestCeo());
        try {
            const ceo = await loadEntityById<ICeo>(CHARACTER_REQUEST_LINK, id);
            dispatch(receiveCeo(ceo));
        } catch (error) {
            dispatch(invalidateCeo(error));
        };
    };
};
