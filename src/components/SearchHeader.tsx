import React, { useCallback, useState } from 'react';
import DropDown from './DropDown';

const ITEMS = [
    { title: 'character', url: 'latest/characters/', value: 'character' },
    { title: 'alliance', url: 'latest/alliances/', value: 'alliance' },
    { title: 'constellation', url: 'latest/universe/constellations/', value: 'constellation' },
    { title: 'corporation', url: 'latest/corporations/', value: 'corporation' },
    { title: 'faction', url: 'latest/universe/factions/', value: 'faction' },
    { title: 'region', url: 'latest/universe/regions/', value: 'region' },
    { title: 'solar system', url: 'latest/universe/systems/', value: 'solar_system' },
    { title: 'station', url: 'latest/universe/stations/', value: 'station' },
    { title: 'inventory type', url: 'latest/universe/ids/', value: 'inventory_type' },
];

type SearchHeaderProps = {
    fetchSearchRequest: (category: { title: string, url: string, value: string }, search: string) => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ fetchSearchRequest }) => {
    const [selectedCategory, setSelectedCategory] = useState(ITEMS[0]);
    const [searchText, setSearchText] = useState('');

    const onSearch = useCallback(() => {
        fetchSearchRequest(selectedCategory, searchText);
    }, [fetchSearchRequest, selectedCategory, searchText]);

    const onChange = useCallback((event) => {
        setSearchText(event.target.value);
    }, [setSearchText]);

    return (
        <div>
            <DropDown items={ITEMS} onChange={event => setSelectedCategory(ITEMS.find(item => event.target.value === item.value) || ITEMS[0])} />
            <input type='text' onChange={onChange} />
            <button onClick={onSearch}>Search</button>
        </div>
    )
};

export default SearchHeader;
