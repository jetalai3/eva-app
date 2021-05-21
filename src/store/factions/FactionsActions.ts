import { Dispatch } from "redux";

import { AppActions } from "../models/actions";

import {
    FETCH_FACTIONS_REQUEST,
    FETCH_FACTIONS_SUCCESS,
    FETCH_FACTIONS_FAILURE,
} from "./models/actions";

import {
    FACTION_REQUEST_LINK,
    SYSTEM_REQUEST_LINK,
    RACE_REQUEST_LINK,
    CORPORATION_REQUEST_LINK,
    CHARACTER_REQUEST_LINK
} from "../../common/constants";

import { ICeo } from "./models/interfaces/ICeo";
import { ICorporation } from "./models/interfaces/ICorporation";
import { IFaction } from "./models/interfaces/IFaction";
import { IRace } from "./models/interfaces/IRace";
import fetchResponse from "../../common/fetchResponse";
import loadEntityById from "../../common/loadEntityById";


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

let racesPromise: Promise<{ race_id: number, name: string }[]> | null = null;
const getRaces = async (url: string) => {
    if (!racesPromise) {
        racesPromise = fetchResponse(url);
    }
    return racesPromise;
}

export const loadFactionInfo = async (faction: IFaction): Promise<IFaction> => {
    const system = await fetchResponse(SYSTEM_REQUEST_LINK + faction.solar_system_id);
    const factionWithSystem = { ...faction, solar_system_name: system.name };
    const corporation: ICorporation | undefined = await loadEntityById<ICorporation>(CORPORATION_REQUEST_LINK, faction.corporation_id).catch(() => undefined);
    if (!corporation) return factionWithSystem;
    const factionWithCorp = { ...factionWithSystem, corporation: corporation };
    const ceo: ICeo | undefined = await loadEntityById<ICeo>(CHARACTER_REQUEST_LINK, corporation.ceo_id).catch(() => undefined);
    if (!ceo) return factionWithCorp;
    const races: { race_id: number, name: string }[] = await getRaces(RACE_REQUEST_LINK);
    const race = races.find(element => element.race_id === ceo.race_id);
    let raceObj: IRace | undefined = race ? { id: race.race_id, name: race.name } : undefined;
    const ceoWithRace: ICeo = { ...ceo, race: raceObj };
    const corpWithCeo = { ...corporation, ceo: ceoWithRace };
    const resultFaction: IFaction = { ...faction, solar_system_name: system.name, corporation: corpWithCeo };
    return resultFaction;
};

export const loadFactions = () => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(requestFactions());
        try {
            const factions: IFaction[] = await fetchResponse(FACTION_REQUEST_LINK);
            const resultFactions = await Promise.all(factions.map(faction => loadFactionInfo(faction)));
            dispatch(receiveFactions(resultFactions));
        } catch (error) {
            dispatch(invalidateFactions(error))
        };
    };
};
