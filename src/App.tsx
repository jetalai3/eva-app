import React from "react"
import Tabs from "./components/Tabs"
import SearchComponent from "./components/SearchComponent"
import FactionsListComponent from "./components/FactionsListComponent"

import './App.css';

const TAB_ITEMS = [
    {
        title: 'Factions',
        content: FactionsListComponent,
    },
    {
        title: 'Search',
        content: SearchComponent,
    }
];

const App: React.FC = () => {
    return (
        <div className="App">
            <Tabs items={TAB_ITEMS} />
        </div>
    )
};

export default App;
