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
            <button onClick={handleClick}>
                Back
            </button>
            <h3>{ceo.name}</h3>
            {ceo.race ? <p>Race: {ceo.race.name}</p> : null}
            <p>Birthday: {bDate}</p>
        </div>
    );
};

export default CeoCard;
