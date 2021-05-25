import { loadFactions } from "./FactionsActions";
import { FETCH_FACTIONS_FAILURE, FETCH_FACTIONS_REQUEST, FETCH_FACTIONS_SUCCESS } from "./actions";

const CORPORATION_ID = 1000084;
const FACTION_ID = 500003;
const SOLAR_SYSTEM_ID = 30002187;
const CEO_ID = 3003881;

const FACTION = {
    corporation_id: CORPORATION_ID,
    faction_id: FACTION_ID,
    name: "Amarr Empire",
    solar_system_id: SOLAR_SYSTEM_ID,
    description: "The largest of the five main empires, the Amarr Empire is a sprawling patch-work of feudal-like provinces held together by the might of the emperor. Religion has always played a big part in Amarrian politics and the Amarrians believe they are the rightful masters of the world, souring their relations with their neighbours. Another source of ill-feelings on part of the other empires is the fact that the Amarrians embrace slavery."
};

const SOLAR_SYSTEM = {
    id: SOLAR_SYSTEM_ID,
    name: "Amarr",
};

const RACE = {
    name: "Amarr",
    race_id: 4
};

const CORPORATION = {
    ceo_id: CEO_ID,
    member_count: 90,
    name: "Amarr Navy",
    description: "asd"
};

const CEO = {
    birthday: "2003-03-27T13:27:00Z",
    name: "Kezti Sundara",
    race_id: RACE.race_id,
};

describe("Test boundRequestFactions", () => {
    it("correct fetch", async () => {
        const dispatch = jest.fn();
        const requestFactions = loadFactions();
        global.fetch = jest.fn()
            .mockResolvedValueOnce({ json: () => [FACTION], ok: true })
            .mockResolvedValueOnce({ json: () => SOLAR_SYSTEM, ok: true })
            .mockResolvedValueOnce({ json: () => CORPORATION, ok: true })
            .mockResolvedValueOnce({ json: () => CEO, ok: true })
            .mockResolvedValueOnce({ json: () => [RACE], ok: true });

        await requestFactions(dispatch);
        expect(dispatch.mock.calls[0][0].type).toEqual(FETCH_FACTIONS_REQUEST);
        expect(dispatch.mock.calls[1][0].type).toEqual(FETCH_FACTIONS_SUCCESS);
        expect(dispatch.mock.calls[1][0].factions).toEqual([{
            corporation_id: CORPORATION_ID,
            corporation: {
                name: CORPORATION.name,
                member_count: CORPORATION.member_count,
                ceo_id: CEO_ID,
                ceo: {
                    name: CEO.name,
                    birthday: CEO.birthday,
                    id: CEO_ID,
                    race: {
                        id: RACE.race_id,
                        name: RACE.name
                    },
                    race_id: CEO.race_id,
                },
                description: CORPORATION.description,
                id: CORPORATION_ID,
            },
            description: FACTION.description,
            name: FACTION.name,
            faction_id: FACTION_ID,
            solar_system_id: SOLAR_SYSTEM_ID,
            solar_system_name: SOLAR_SYSTEM.name
        }]);
    });

    it("error", async () => {
        const dispatch = jest.fn();
        const requestFactions = loadFactions();
        global.fetch = jest.fn(() => {
            return Promise.reject();
        })
        await requestFactions(dispatch);
        expect(dispatch.mock.calls[1][0].type).toEqual(FETCH_FACTIONS_FAILURE);
    });
});
