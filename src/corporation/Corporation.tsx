import React from "react";

import { ICorporation } from "../store/factions/models/interfaces/ICorporation";
import CorporationCeoCard from "./CorporationCeoCard";
import CorporationCard from "./CorporationCard";
import useToggle from "../hooks/useToggle";

import "./Corporation.css";

type CorporationProps = {
    onClose: () => void;
    corporation: Partial<ICorporation>;
};

const Corporation: React.FC<CorporationProps> = ({ corporation, onClose }) => {
    const { toggled: cardToggled, onToggledChange: onCardToggle } = useToggle();

    const content = !cardToggled ?
        <CorporationCard handleClick={onCardToggle} corporation={corporation} /> :
        <CorporationCeoCard handleClick={onCardToggle} ceo={corporation.ceo} />
    return (
        <div className="content-wrapper" onClick={event => event.stopPropagation()}>
            <button className="btn btn-secondary" onClick={onClose}>
                Close
            </button>
            {content}
        </div>
    );
};

export default Corporation;
