import React from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { IFaction } from "../store/factions/IFaction";
import Modal from "../components/Modal";
import CorporationWrapper from "../corporation/CorporationWrapper";
import useToggle from "../hooks/useToggle";
import { AppState } from "../store/rootStore";
import { loadCorporation } from "../store/corporations/CorporationsActions";
import { AppActions } from "../store/models/actions";

import FactionCard from "./FactionCard";
import { loadSystem } from "../store/systems/SystemsActions";

type FactionWrapperProps = {
    element: IFaction
};

interface LinkDispatchProps {
    loadCorporation: (id: number) => void;
    loadSystem: (id: number) => void;
};

type LinkProps = FactionWrapperProps & LinkDispatchProps;

const mapDispatchToProps = (
    dispatch: ThunkDispatch<AppState, {}, AppActions>
) => ({
    loadCorporation: bindActionCreators(loadCorporation, dispatch),
    loadSystem: bindActionCreators(loadSystem, dispatch)
});

const FactionWrapper: React.FC<LinkProps> = (props) => {
    const { element, loadCorporation, loadSystem } = props;
    const { toggled: cardToggled, onToggledChange: onCardToggle } = useToggle();
    const { toggled: modalToggled, onToggledChange: onModalToggle } = useToggle();

    const corporation = useSelector((state: AppState) => state.corporationsReducer.corporations.find(el => el.id === element.corporation_id));
    const system = useSelector((state: AppState) => state.systemsReducer.systems.find(el=> el.id === element.solar_system_id));

    const handleClick = () => {
        if (element.corporation_id && !corporation) loadCorporation(element.corporation_id);
        if(element.solar_system_id && !system) loadSystem(element.solar_system_id);
        onCardToggle();
    };

    return (<>
        <FactionCard
            faction={element}
            corporationName={corporation?.name}
            systemName={system?.name}
            handleClick={handleClick}
            onModalToggle={onModalToggle}
            cardToggled={cardToggled}
        />
        {modalToggled && corporation && (<Modal onClose={onModalToggle}>
            <CorporationWrapper onClose={onModalToggle} corporation={corporation} />
        </Modal>)}</>)
};

export default connect(null, mapDispatchToProps)(FactionWrapper);
