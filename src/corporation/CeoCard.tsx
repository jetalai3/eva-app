import React from "react";
import { ICeo } from "../store/factions/models/interfaces/ICeo";

type CeoCardProps = {
    ceo: Partial<ICeo> | any;
    handleClick: (event: React.MouseEvent) => void;
};

const CeoCard: React.FC<CeoCardProps> = ({ ceo, handleClick }) => {
    const bDate = new Date(ceo.birthday).toLocaleDateString("en-US");
    return (
        <div>
            <h3>{ceo.name}</h3>
            {ceo.race ? <p>Race: {ceo.race.name}</p> : null}
            <p>Birthday: {bDate}</p>
            <button className="btn btn-secondary" onClick={handleClick}>
                Back
            </button>
        </div>
    );
};

export default CeoCard;
