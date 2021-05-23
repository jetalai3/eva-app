import React from "react";

import { IFaction } from "../store/factions/models/interfaces/IFaction";
import Modal from "../components/Modal";
import Corporation from "../corporation/Corporation";
import useToggle from "../hooks/useToggle";

type FactionCardProps = {
    factionElement: IFaction
};

const FactionCard: React.FC<FactionCardProps> = ({ factionElement }) => {
    const { toggled: cardToggled, onToggledChange: onCardToggle } = useToggle();
    const { toggled: modalToggled, onToggledChange: onModalToggled } = useToggle();

    return (
        <li className="factions-item">
            <h3 className="link-primary" onClick={onCardToggle}>{factionElement.name}</h3>
            {cardToggled && (
                <>
                    <p>Home solar system: {factionElement.solar_system_name}</p>
                    <p>Description: {factionElement.description}</p>
                    {factionElement.corporation && (
                        <button className="btn btn-primary" onClick={onModalToggled}>
                            {factionElement.corporation.name}
                        </button>)}
                    {modalToggled && (<Modal onClose={onModalToggled}>
                        <Corporation onClose={onModalToggled} corporation={factionElement.corporation} />
                    </Modal>)}
                </>
            )}
        </li>
    );
};

export default FactionCard;
