import React, { useEffect } from "react";

import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { AppState } from "../store/rootStore";
import { AppActions } from "../store/models/actions";

import { IFaction } from "../store/factions/models/interfaces/IFaction";
import { loadFactions } from "../store/factions/FactionsActions";
import FactionCard from "./FactionCard";

import "./Factions.css";

interface LinkStateProps {
    factions: IFaction[];
};

interface LinkDispatchProps {
    loadFactions: () => void;
};

type LinkProps = LinkStateProps & LinkDispatchProps;

const mapStateToProps = (state: AppState): LinkStateProps => ({
    factions: state.factionsReducer.factions,
});

const mapDispatchToProps = (
    dispatch: ThunkDispatch<AppState, {}, AppActions>
) => ({
    loadFactions: bindActionCreators(loadFactions, dispatch),
});

const FactionsList: React.FC<LinkProps> = (props) => {
    const factionsState = useSelector((state: AppState) => state.factionsReducer.factions);
    const { factions, loadFactions } = props;

    useEffect(() => {
        if (!factionsState.length) loadFactions();
    }, [loadFactions, factionsState.length]);

    return (
        <div>
            <h1>Factions of EVE Online</h1>
            <ul>
                {factions.map((faction: IFaction, index: number) => (
                    <FactionCard factionElement={faction} key={index} />
                ))}
            </ul>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(FactionsList);
