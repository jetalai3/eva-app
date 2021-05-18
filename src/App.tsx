import React from "react"
import Tabs from "./components/Tabs"
import Tab from "./components/Tab"
import SearchComponent from "./components/SearchComponent"
import FactionsListComponent from "./components/FactionsListComponent"

import './App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <Tabs>
                <Tab title="Factions" child={<FactionsListComponent />}>Factions</Tab>
                <Tab title="Search" child={<SearchComponent />}>Search</Tab>
            </Tabs>
        </div>
    )
};

export default App;
