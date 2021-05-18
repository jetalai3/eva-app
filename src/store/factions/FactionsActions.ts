import { Dispatch } from 'redux';

import { AppActions } from '../models/actions';

import {
    FETCH_FACTIONS_REQUEST,
    FETCH_FACTIONS_SUCCESS,
    FETCH_FACTIONS_FAILURE,
} from './models/actions';

import {
    FACTION_REQUEST_LINK,
    SYSTEM_REQUEST_LINK,
    RACE_REQUEST_LINK,
    CORPORATION_REQUEST_LINK,
    CHARACTER_REQUEST_LINK
} from '../../api';

import { ICeo, IFaction } from './models/factionsInterface';

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

const parseResponse = async (url: string) => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const jsonValue = await response.json();
            return Promise.resolve(jsonValue);
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log(error)
    }
}

const fetchCorpInfo = async (data: IFaction[]) => {
    const races = await parseResponse(RACE_REQUEST_LINK);
    await Promise.all(data.map(async (element: IFaction, index: number, array: IFaction[]) => {
        try {
            const data = await parseResponse(CORPORATION_REQUEST_LINK + element.corporation_id);
            const ceo = await parseResponse(CHARACTER_REQUEST_LINK + data.ceo_id);
            let corporation = {
                name: data.name,
                member_count: data.member_count,
                ceo_id: data.ceo_id,
                ceo: {},
                description: data.description
            };
            if (ceo) {
                const ceoObject: ICeo = {
                    name: ceo.name,
                    birthday: new Date(ceo.birthday),
                    race_id: ceo.race_id,
                    race_name: races.find((el: any) => el.race_id === ceo.race_id).name,
                };
                corporation = { ...corporation, ceo: ceoObject };
            }
            array[index] = { ...element, corporation: corporation };
        } catch (error) {
            return console.log(error);
        }
    }));
    return data;
}

export const boundRequestFactions = () => {
    return (dispatch: Dispatch<AppActions>) => {
        dispatch(requestFactions());
        return fetch(FACTION_REQUEST_LINK)
            .then((res) => res.json())
            .then(async data => {
                await Promise.all(data.map(async (element: IFaction, index: number, array: IFaction[]) => {
                    return await parseResponse(SYSTEM_REQUEST_LINK + element.solar_system_id)
                        .then(data => {
                            array[index] = {
                                corporation_id: element.corporation_id,
                                corporation: {},
                                description: element.description,
                                name: element.name,
                                solar_system_id: element.solar_system_id,
                                solar_system_name: data.name
                            };
                        })
                }));
                return data;
            })
            .then(async data => await fetchCorpInfo(data))
            .then((json) => dispatch(receiveFactions(json)))
            .catch((error) => dispatch(invalidateFactions(error)));
    };
};
