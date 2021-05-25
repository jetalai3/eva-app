import React, { useEffect } from "react";

import { ICorporation } from "../store/corporations/ICorporation";
import CorporationCard from "./CorporationCard";
import useToggle from "../hooks/useToggle";


import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../store/rootStore";
import { AppActions } from "../store/models/actions";
import { bindActionCreators } from "redux";
import { loadCeo } from "../store/ceos/CeoActions";
import { connect, useSelector } from "react-redux";
import CeoWrapper from "../ceo/CeoWrapper";

import "./Corporation.css";

type CorporationWrapperProps = {
    onClose: () => void;
    corporation: Partial<ICorporation>;
};

interface LinkDispatchProps {
    loadCeo: (id: number) => void;
};

type LinkProps = CorporationWrapperProps & LinkDispatchProps;

const mapDispatchToProps = (
    dispatch: ThunkDispatch<AppState, {}, AppActions>
) => ({
    loadCeo: bindActionCreators(loadCeo, dispatch),
});

const stopPropagate = (event: React.SyntheticEvent) => {
    event.stopPropagation();
};

const CorporationWrapper: React.FC<LinkProps> = (props) => {
    const { corporation, onClose, loadCeo } = props;
    const { toggled: cardToggled, onToggledChange: onCardToggle } = useToggle();
    const ceo = useSelector((state: AppState) => state.ceoReducer.ceos.find(el => el.id === corporation.ceo_id));

    useEffect(() => {
        if (!ceo && corporation.ceo_id) loadCeo(corporation.ceo_id);
    }, [ceo, corporation.ceo_id, loadCeo]);

    return (
        <div className="content-wrapper" onClick={stopPropagate}>
            {!cardToggled ?
                <CorporationCard handleClick={onCardToggle} corporation={corporation} ceo={ceo} onClose={onClose} /> :
                ceo && <CeoWrapper onCardToggle={onCardToggle} ceo={ceo} onClose={onClose} />}
        </div>
    );
};

export default connect(null, mapDispatchToProps)(CorporationWrapper);
