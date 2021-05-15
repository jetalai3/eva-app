import { Dispatch } from 'redux';

import { AppActions } from '../models/actions';

import {
    FETCH_FACTIONS_REQUEST,
    FETCH_FACTIONS_SUCCESS,
    FETCH_FACTIONS_FAILURE,
} from './models/actions';

import { IFaction } from './models/factionsInterface';

const requestFactions = (): AppActions => ({
    type: FETCH_FACTIONS_REQUEST,
    loading: true,
    factions: [],
    error: '',
});
const receiveFactions = (factions: IFaction[]): AppActions => ({
    type: FETCH_FACTIONS_SUCCESS,
    loading: false,
    factions: factions,
    error: '',
});
const invalidateFactions = (errorText: string): AppActions => ({
    type: FETCH_FACTIONS_FAILURE,
    loading: false,
    factions: [],
    error: `Unable to fetch factions. ${errorText} `,
});

export const boundRequestFactions = () => {
    return (dispatch: Dispatch<AppActions>) => {
        dispatch(requestFactions());
        return fetch(`https://esi.evetech.net/latest/universe/factions/?datasource=tranquility&language=en`)
            .then((res) => res.json())
            .then(async data => {
                await Promise.all(data.map((element: IFaction, index: number, array: IFaction[]) => {
                    return fetch('https://esi.evetech.net/dev/universe/systems/' + element.solar_system_id)
                        .then(response => response.json())
                        .then(data => {
                            array[index] = { ...element, solar_system_name: data.name };
                        })
                }));
                return data;
            })
            .then((json) => dispatch(receiveFactions(json)))
            .catch((error) => dispatch(invalidateFactions(error)));
    };
};
