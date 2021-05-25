import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { ICeo } from "../store/ceos/ICeo";
import { AppState } from "../store/rootStore";
import { AppActions } from "../store/models/actions";
import { loadRaces } from "../store/races/RacesActions";

import CeoCard from "./CeoCard";

type CeoWrapperProps = {
    onClose: () => void;
    onCardToggle: () => void;
    ceo: ICeo;
};

interface LinkDispatchProps {
    loadRaces: (id: number) => void;
};

type LinkProps = CeoWrapperProps & LinkDispatchProps;

const mapDispatchToProps = (
    dispatch: ThunkDispatch<AppState, {}, AppActions>
) => ({
    loadRaces: bindActionCreators(loadRaces, dispatch),
});

const CeoWrapper: React.FC<LinkProps> = (props) => {
    const { ceo, onClose, loadRaces, onCardToggle } = props;
    const race = useSelector((state: AppState) => state.racesReducer.races.find(el => el.race_id === ceo.race_id));

    useEffect(() => {
        if (!race && ceo.race_id) loadRaces(ceo.race_id);
    }, [ceo, loadRaces, race]);

    return (
        <CeoCard
            ceo={ceo}
            race={race}
            handleClick={onCardToggle}
            onClose={onClose}
        />
    );
};

export default connect(null, mapDispatchToProps)(CeoWrapper);
