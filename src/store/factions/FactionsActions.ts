import { Dispatch } from "redux";

import { AppActions } from "../models/actions";

import {
    FETCH_FACTIONS_REQUEST,
    FETCH_FACTIONS_SUCCESS,
    FETCH_FACTIONS_FAILURE,
} from "./actions";

import { FACTION_REQUEST_LINK } from "../../common/constants";
import { IFaction } from "./IFaction";
import fetchResponse from "../../common/fetchResponse";

const requestFactions = (): AppActions => ({
    type: FETCH_FACTIONS_REQUEST,
    loading: true,
    factions: [],
    error: "",
});
const receiveFactions = (factions: IFaction[]): AppActions => ({
    type: FETCH_FACTIONS_SUCCESS,
    loading: false,
    factions: factions,
    error: "",
});
const invalidateFactions = (errorText: string): AppActions => ({
    type: FETCH_FACTIONS_FAILURE,
    loading: false,
    factions: [],
    error: `Unable to fetch factions. ${errorText} `,
});

export const loadFactions = () => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(requestFactions());
        try {
            const factions: IFaction[] = await fetchResponse(FACTION_REQUEST_LINK);
            dispatch(receiveFactions(factions));
        } catch (error) {
            dispatch(invalidateFactions(error))
        };
    };
};
