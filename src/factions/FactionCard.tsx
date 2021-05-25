import React from "react";

import { IFaction } from "../store/factions/IFaction";

type FactionCardProps = {
    faction: IFaction;
    corporationName?: string;
    systemName?: string;
    cardToggled: boolean;
    handleClick: () => void;
    onModalToggle: () => void;
};

const FactionCard: React.FC<FactionCardProps> = (props) => {
    const { faction, handleClick, cardToggled, onModalToggle, corporationName, systemName } = props;
    return (
        <li className="factions-item">
            <h3 className="link-primary" onClick={handleClick}>{faction.name}</h3>
            {cardToggled && (
                <>
                    <p>Home solar system: {systemName}</p>
                    <p>Description: {faction.description}</p>
                    {corporationName && (
                        <button className="btn btn-primary" onClick={onModalToggle}>
                            {corporationName}
                        </button>)}
                </>
            )}
        </li>
    );
};

export default FactionCard;
