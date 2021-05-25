import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"
import thunk, { ThunkMiddleware } from "redux-thunk";
import { createLogger } from "redux-logger";

import { factionsReducer } from "./factions/FactionsReducer";
import { corporationsReducer } from "./corporations/CorporationsReducer";
import { ceoReducer } from "./ceos/CeoReducer";
import { searchReducer } from "./search/SearchReducer";
import { systemsReducer } from "./systems/SystemsReducer";
import { racesReducer } from "./races/RacesReducer";
import { AppActions } from "./models/actions";

const logger = createLogger();

export const rootReducer = combineReducers({
    factionsReducer,
    corporationsReducer,
    ceoReducer,
    systemsReducer,
    racesReducer,
    searchReducer
});

const composedEnhancer = composeWithDevTools(
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>, logger)
);

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore<AppState, AppActions, {}, {}>(
    rootReducer, composedEnhancer
);
