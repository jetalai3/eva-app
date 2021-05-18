import React, { useState } from 'react'
import { ICorporation } from '../store/factions/models/factionsInterface';

type CorporationProps = {
    setModalOpen: any;
    corporation: Partial<ICorporation>;
};

const Corporation: React.FC<CorporationProps> = ({ corporation, setModalOpen }) => {
    const [showState, setShowState] = useState<boolean>(false);

    return (
        <div className="content-wrapper" onClick={event => setModalOpen(event)}>
            <button
                type='button'
                className='clickable'
                onClick={event => setModalOpen(event)}
            >
                Close
            </button>
            {!showState ? (<div>
                <h3>{corporation.name}</h3>
                <p>Member count: {corporation.member_count}</p>
                <p>{corporation.description}</p>
                <button onClick={() => setShowState(!showState)}>
                    <span>{corporation.ceo?.name}</span>
                </button>
            </div>) :
                (
                    <div>
                        <button onClick={() => setShowState(!showState)}>
                            <span>Back</span>
                        </button>
                        <h3>{corporation.ceo?.name}</h3>
                        <p>Race: {corporation.ceo?.race_name}</p>
                        <p>Birthday: {corporation.ceo?.birthday?.toLocaleDateString('en-US')}</p>
                    </div>
                )}
        </div>
    )
};

export default Corporation;
