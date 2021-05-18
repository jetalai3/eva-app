import React, { useCallback, useState } from 'react';
import DropDown from './DropDown';
import { SEARCH_OPTIONS } from '../constants';
import { ICategory } from '../store/search/models/searchInterface';

type SearchHeaderProps = {
    fetchSearchRequest: (category: ICategory, search: string) => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ fetchSearchRequest }) => {
    const [selectedCategory, setSelectedCategory] = useState(SEARCH_OPTIONS[0]);
    const [searchText, setSearchText] = useState('');

    const onSearch = useCallback(() => {
        fetchSearchRequest(selectedCategory, searchText);
    }, [fetchSearchRequest, selectedCategory, searchText]);

    const onChange = useCallback((event) => {
        setSearchText(event.target.value);
    }, [setSearchText]);

    return (
        <div>
            <DropDown items={SEARCH_OPTIONS} onChange={event => setSelectedCategory(SEARCH_OPTIONS.find(item => event.target.value === item.value) || SEARCH_OPTIONS[0])} />
            <input type='text' onChange={onChange} />
            <button onClick={onSearch}>Search</button>
        </div>
    )
};

export default SearchHeader;
