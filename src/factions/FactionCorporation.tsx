import React, { useCallback, useState } from 'react'
import { ICorporation } from '../store/factions/models/factionsInterface';
import CeoCard from '../corporation/CeoCard';
import CorporationCard from '../corporation/CorporationCard';

type CorporationProps = {
    onClose: () => void;
    corporation: Partial<ICorporation>;
};

const Corporation: React.FC<CorporationProps> = ({ corporation, onClose }) => {
    const [showState, setShowState] = useState<boolean>(false);

    const showStateChange = useCallback((event) => {
        event.stopPropagation();
        setShowState(!showState);
    }, [showState])

    const content = !showState ?
        <CorporationCard handleClick={showStateChange} corporation={corporation} /> :
        <CeoCard handleClick={showStateChange} ceo={corporation.ceo} />
    return (
        <div className="content-wrapper" onClick={event => event.stopPropagation()}>
            <button onClick={onClose}>
                Close
            </button>
            {content}
        </div>
    )
};

export default Corporation;
