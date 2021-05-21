import { FactionActionTypes } from "../factions/models/actions";
import { SearchActionTypes } from "../search/models/actions";

export type AppActions = FactionActionTypes | SearchActionTypes;
