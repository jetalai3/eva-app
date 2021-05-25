import { CorporationActionTypes } from "../corporations/actions";
import { CeoActionTypes } from "../ceos/actions";
import { FactionActionTypes } from "../factions/actions";
import { SearchActionTypes } from "../search/models/actions";
import { SystemActionTypes } from "../systems/actions";
import { RacesActionTypes } from "../races/actions";

export type AppActions = FactionActionTypes |
    CorporationActionTypes |
    CeoActionTypes |
    SystemActionTypes |
    RacesActionTypes |
    SearchActionTypes;
