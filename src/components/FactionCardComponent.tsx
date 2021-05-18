import React, { useState } from 'react'
import { IFaction } from '../store/factions/models/factionsInterface';
import Modal from './ModalComponent';
import Corporation from './CorporationComponent';

type FactionCardProps = {
    factionElement: IFaction
}

const FactionCard: React.FC<FactionCardProps> = ({ factionElement }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleCardOpen = () => {
        setOpen(!open);
    }

    const handleModalOpen = (event: React.MouseEvent<HTMLElement>) => {
        if(!(event.target as any).classList.contains('clickable')) return;
        setModalOpen(!modalOpen);
    }

    return open ? (
        <li>
            <p onClick={handleCardOpen}>Faction name: {factionElement.name}</p>
            <p>Solar system name: {factionElement.solar_system_name}</p>
            <p>Description: {factionElement.description}</p>
            {factionElement.corporation.name ? (<button
                type='button'
                className='clickable'
                onClick={(event) => handleModalOpen(event)}
            >
                {factionElement.corporation.name}
            </button>) : null}
            <Modal modalOpen={modalOpen} setModalOpen={handleModalOpen}>
                <Corporation setModalOpen={handleModalOpen} corporation={factionElement.corporation} />
            </Modal>
        </li>
    ) :
        (<li
            key={factionElement.name}
        >
            <p onClick={handleCardOpen}>Faction name: {factionElement.name}</p>
        </li>)
}

export default FactionCard;
