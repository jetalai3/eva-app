import React, { useCallback, useState } from "react";
import { SEARCH_OPTIONS } from "../common/constants";
import { ICategory } from "../store/search/models/searchInterface";

const useSearch = (onSubmit: (category: ICategory, searchText: string) => void) => {
    const [selectedCategory, setSelectedCategory] = useState(SEARCH_OPTIONS[0]);
    const [searchText, setSearchText] = useState("");

    const onSelectedCategoryChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(SEARCH_OPTIONS.find(item => event.target.value === item.value) || SEARCH_OPTIONS[0]);
    }, [setSelectedCategory]);

    const onSearch = useCallback(() => {
        onSubmit(selectedCategory, searchText);
    }, [onSubmit, selectedCategory, searchText]);

    const onTextChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    }, [setSearchText]);

    return { onSelectedCategoryChange, onSearch, onTextChange };
};

export default useSearch;
