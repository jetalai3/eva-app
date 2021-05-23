import React from "react";

import { IFaction } from "../store/factions/models/interfaces/IFaction";
import Modal from "../components/Modal";
import Corporation from "../corporation/Corporation";
import useToggle from "../hooks/useToggle";

type FactionCardProps = {
    element: IFaction
};

const FactionCard: React.FC<FactionCardProps> = ({ element }) => {
    const { toggled: cardToggled, onToggledChange: onCardToggle } = useToggle();
    const { toggled: modalToggled, onToggledChange: onModalToggle } = useToggle();

    return (
        <li className="factions-item">
            <h3 className="link-primary" onClick={onCardToggle}>{element.name}</h3>
            {cardToggled && (
                <>
                    <p>Home solar system: {element.solar_system_name}</p>
                    <p>Description: {element.description}</p>
                    {element.corporation && (
                        <button className="btn btn-primary" onClick={onModalToggle}>
                            {element.corporation.name}
                        </button>)}
                    {modalToggled && (<Modal onClose={onModalToggle}>
                        <Corporation onClose={onModalToggle} corporation={element.corporation} />
                    </Modal>)}
                </>
            )}
        </li>
    );
};

export default FactionCard;
