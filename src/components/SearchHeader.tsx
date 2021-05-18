import React, { useCallback, useState } from 'react';
import DropDown from './DropDown';

const ITEMS = [
    { title: 'character', url: 'latest/characters/', value: 'character' },
    { title: 'alliance', url: 'dev/alliances/', value: 'alliance' },
    // constellation: '/universe/constellations /{ constellation_id }/',
    //     corporation: '/corporations/{ corporation_id }/',
    //         faction: ' /universe/factions/',
    //             region: '/universe/regions/{ region_id } /',
    //                 solar_system: '/universe/systems/{ system_id }/',
    //                     station: '/universe/stations/{ station_id }/',
    //                         inventory_type: '/universe/ids /',
];

type SearchHeaderProps = {
    fetchSearchRequest: (category: { title: string, url: string, value: string }, search: string)=>void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ fetchSearchRequest }) => {
    const [selectedCategory, setSelectedCategory] = useState(ITEMS[0]);
    const [searchText, setSearchText] = useState('');

    const onSearch = useCallback(() => {
        fetchSearchRequest(selectedCategory, searchText);
    }, [selectedCategory, searchText]);

    const onChange = useCallback((event) => {
        setSearchText(event.target.value);
    }, [setSearchText]);

    return (
        <div>
            <DropDown items={ITEMS} onChange={event => setSelectedCategory(ITEMS.find(item => event.target.value === item.value)||ITEMS[0])} />
            <input type='text' onChange={onChange} />
            <button onClick={onSearch}>Search</button>
        </div>
    )
};

export default SearchHeader;
