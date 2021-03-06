import React, { useState } from 'react'

import { IFaction } from '../store/factions/models/factionsInterface';
import Modal from '../components/Modal';
import Corporation from './FactionCorporation';

type FactionCardProps = {
    factionElement: IFaction
}

const FactionCard: React.FC<FactionCardProps> = ({ factionElement }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleCardOpen = () => {
        setOpen(!open);
    }

    const handleModalOpen = () => {
        setModalOpen(!modalOpen);
    }

    return (
        <li className="factions-item">
            <p onClick={handleCardOpen}>Faction name: {factionElement.name}</p>
            {open && (
                <>
                    <p>Solar system name: {factionElement.solar_system_name}</p>
                    <p>Description: {factionElement.description}</p>
                    {factionElement.corporation.name && (
                        <button onClick={handleModalOpen}>
                            {factionElement.corporation.name}
                        </button>)}
                    {modalOpen && (<Modal onClose={handleModalOpen}>
                        <Corporation onClose={handleModalOpen} corporation={factionElement.corporation} />
                    </Modal>)}
                </>
            )}
        </li>
    )
}

export default FactionCard;
