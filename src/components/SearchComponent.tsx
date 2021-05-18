import React, { useCallback, useState } from "react";
import SearchHeader from "./SearchHeader";
import { SEARCH_REQUEST_LINK, MAIN_URL } from '../api';

const SearchComponent: React.FC = () => {
    const [data, setData] = useState([]);
    const fetchSearchRequest = useCallback((category, searchText) => {
        const url = new URL(SEARCH_REQUEST_LINK);
        url.searchParams.set('categories', category.value);
        url.searchParams.set('search', searchText);
        fetch(url.toString()).then((res) => res.json())
            .then(data => { return data[category.value] })
            .then(async ids => {
                setData(
                    await Promise.all(ids.map((id: number) => {
                        const newUrl = new URL(category.url + id, MAIN_URL)
                        return fetch(newUrl.toString())
                            .then(res => res.json())
                    })))


            })
    }, []);

    return (
        <div><SearchHeader fetchSearchRequest={fetchSearchRequest} />
            {data.toString()}</div>
    )
}

export default SearchComponent;
