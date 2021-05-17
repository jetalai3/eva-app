import React, { useEffect } from 'react';

import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { AppState } from '../store/rootStore';
import { AppActions } from '../store/models/actions';

import { IFaction } from '../store/factions/models/factionsInterface';
import { boundRequestFactions } from '../store/factions/FactionsActions';
import FactionCard from './FactionCardComponent';

interface Props { }

interface LinkStateProps {
    factions: IFaction[];
}

interface LinkDispatchProps {
    boundRequestFactions: () => void;
}

type LinkProps = Props & LinkStateProps & LinkDispatchProps;

const mapStateToProps = (state: AppState): LinkStateProps => ({
    factions: state.factionsReducer.factions,
});

const mapDispatchToProps = (
    dispatch: ThunkDispatch<AppState, {}, AppActions>
) => ({
    boundRequestFactions: bindActionCreators(boundRequestFactions, dispatch),
});

const FactionsList: React.FC<LinkProps> = (props) => {
    const factionsState = useSelector((state: AppState) => state.factionsReducer.factions);
    const { factions, boundRequestFactions } = props;

    useEffect(() => {
        if (!factionsState.length) boundRequestFactions();
    }, [boundRequestFactions, factionsState.length]);

    return (
        <div>
            <h1>Factions of EVE Online</h1>
            <ul>
                {factions.map((faction: IFaction, index: number) => (
                    <FactionCard factionElement={faction} key={index} />
                ))}
            </ul>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(FactionsList);
