import React, { useState } from 'react'
import { IFaction } from '../store/factions/models/factionsInterface';

type FactionCardProps = {
    factionElement: IFaction
}

const FactionCard: React.FC<FactionCardProps> = ({ factionElement }) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setOpen(!open);
    }

    return open ? (
        <li>
            <p onClick={handleOpen}>Faction name: {factionElement.name}</p>
            <p>Corp ID: {factionElement.corporation_id}</p>
            <p>Corp name: {factionElement.corporation.name}</p>
            <p>Solar system ID: {factionElement.solar_system_id}</p>
            <p>Solar system name: {factionElement.solar_system_name}</p>
            <p>Description: {factionElement.description}</p>
        </li>
    ) :
        (<li
            key={factionElement.name}
        >
            <p onClick={handleOpen}>Faction name: {factionElement.name}</p>
        </li>)
}

export default FactionCard;
