import FactionsList from "../factions/FactionsList";
import Search from "../search/Search";

export const FACTION_REQUEST_LINK: string = "https://esi.evetech.net/latest/universe/factions/?datasource=tranquility&language=en";
export const SYSTEM_REQUEST_LINK: string = "https://esi.evetech.net/dev/universe/systems/";
export const RACE_REQUEST_LINK: string = "https://esi.evetech.net/latest/universe/races/?datasource=tranquility&language=en";
export const CORPORATION_REQUEST_LINK: string = "https://esi.evetech.net/latest/corporations/";
export const CHARACTER_REQUEST_LINK: string = "https://esi.evetech.net/latest/characters/";
export const SEARCH_REQUEST_LINK: string = "https://esi.evetech.net/dev/search";
export const MAIN_URL: string ="https://esi.evetech.net/";

export const SEARCH_OPTIONS = [
    { title: "character", url: "latest/characters/", value: "character" },
    { title: "alliance", url: "latest/alliances/", value: "alliance" },
    { title: "constellation", url: "latest/universe/constellations/", value: "constellation" },
    { title: "corporation", url: "latest/corporations/", value: "corporation" },
    { title: "faction", url: "latest/universe/factions/", value: "faction" },
    { title: "region", url: "latest/universe/regions/", value: "region" },
    { title: "solar system", url: "latest/universe/systems/", value: "solar_system" },
    { title: "station", url: "latest/universe/stations/", value: "station" },
    { title: "inventory type", url: "latest/universe/ids/", value: "inventory_type" },
];


export const TAB_ITEMS = [
    {
        title: "Factions",
        content: FactionsList,
    },
    {
        title: "Search",
        content: Search,
    }
];