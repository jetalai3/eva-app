import { Dispatch } from "redux";

import { AppActions } from "../models/actions";

import {
    FETCH_RACES_REQUEST,
    FETCH_RACES_SUCCESS,
    FETCH_RACES_FAILURE,
} from "./actions";

import {
    RACE_REQUEST_LINK,
} from "../../common/constants";

import { IRace } from "../races/IRace";
import fetchResponse from "../../common/fetchResponse";

const requestRaces = (): AppActions => ({
    type: FETCH_RACES_REQUEST,
    loading: true,
    races: [],
});
const receiveRaces = (races: IRace[]): AppActions => ({
    type: FETCH_RACES_SUCCESS,
    loading: false,
    races: races,
});
const invalidateRaces = (errorText: string): AppActions => ({
    type: FETCH_RACES_FAILURE,
    loading: false,
    races: [],
    error: `Unable to fetch races. ${errorText} `,
});

let racesPromise: Promise<IRace[]> | null = null;
const getRaces = async (url: string) => {
    if (!racesPromise) {
        racesPromise = fetchResponse(url);
    }
    return racesPromise;
};

export const loadRaces = () => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(requestRaces());
        try {
            const races: IRace[] = await getRaces(RACE_REQUEST_LINK);
            dispatch(receiveRaces(races));
        } catch (error) {
            dispatch(invalidateRaces(error))
        };
    };
};
