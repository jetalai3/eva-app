import React from "react";
import { ICeo } from "../store/ceos/ICeo";
import { ICorporation } from "../store/corporations/ICorporation";

type CorporationCardProps = {
    corporation: Partial<ICorporation>;
    ceo?: ICeo;
    handleClick: () => void;
    onClose: () => void;
};

const CorporationCard: React.FC<CorporationCardProps> = (props) => {
    const { corporation, ceo, handleClick, onClose } = props;

    return (
        <div>
            <button className="btn btn-secondary" onClick={onClose}>
                Close
            </button>
            <h3 className="corporation-header">{corporation.name}</h3>
            <p className="corporation-member_count">Member count: {corporation.member_count}</p>
            <p>{corporation.description}</p>
            {ceo && (
                <button className="btn btn-secondary" onClick={handleClick}>
                    CEO: {ceo.name}
                </button>
            )}
        </div>
    );
};

export default CorporationCard;
