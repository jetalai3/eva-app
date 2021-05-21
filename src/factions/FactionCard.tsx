/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useState } from "react";

import { IFaction } from "../store/factions/models/interfaces/IFaction";
import Modal from "../components/Modal";
import Corporation from "../corporation/Corporation";

type FactionCardProps = {
    factionElement: IFaction
};

const FactionCard: React.FC<FactionCardProps> = ({ factionElement }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleCardOpen = useCallback((event) => {
        event.preventDefault();
        setOpen(!open);
    }, [open])

    const handleModalOpen = useCallback(() => {
        setModalOpen(!modalOpen);
    }, [modalOpen]);

    return (
        <li className="factions-item">
            <a className="link-primary" href="#" onClick={handleCardOpen}>{factionElement.name}</a>
            {open && (
                <>
                    <p>Home solar system: {factionElement.solar_system_name}</p>
                    <p>Description: {factionElement.description}</p>
                    {factionElement.corporation && (
                        <button className="btn btn-primary" onClick={handleModalOpen}>
                            {factionElement.corporation.name}
                        </button>)}
                    {modalOpen && (<Modal onClose={handleModalOpen}>
                        <Corporation onClose={handleModalOpen} corporation={factionElement.corporation} />
                    </Modal>)}
                </>
            )}
        </li>
    );
};

export default FactionCard;
