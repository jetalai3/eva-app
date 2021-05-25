import React from "react";
import { ICeo } from "../store/ceos/ICeo";
import { IRace } from "../store/races/IRace";

type CeoCardProps = {
    ceo: ICeo;
    race?: IRace;
    handleClick: () => void;
    onClose: () => void;
};

const CeoCard: React.FC<CeoCardProps> = (props) => {
    const { ceo, handleClick, onClose, race } = props;
    const bDate = new Date(ceo.birthday).toLocaleDateString("en-US");
    return (
        <div>
            <button className="btn btn-secondary" onClick={onClose}>
                Close
            </button>
            <h3>{ceo.name}</h3>
            {race ? <p>Race: {race.name}</p> : null}
            <p>Birthday: {bDate}</p>
            <button className="btn btn-secondary" onClick={handleClick}>
                Back
            </button>
        </div>
    );
};

export default CeoCard;
