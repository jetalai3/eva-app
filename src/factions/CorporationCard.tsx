import React from "react";
import { ICorporation } from "../store/factions/models/interfaces/ICorporation";

type CorporationCardProps = {
    corporation: Partial<ICorporation>;
    handleClick: (event: React.MouseEvent) => void;
};

const CorporationCard: React.FC<CorporationCardProps> = ({ corporation, handleClick }) => {
    const haveCeo = corporation.ceo && Object.keys(corporation.ceo).length !== 0;
    return (
        <div>
            <h3>{corporation.name}</h3>
            <p>Member count: {corporation.member_count}</p>
            <p>{corporation.description}</p>
            {haveCeo && (
                <button onClick={handleClick}>
                    {corporation.ceo?.name}
                </button>
            )}
        </div>
    );
};

export default CorporationCard;
