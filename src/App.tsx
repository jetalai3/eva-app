import React from "react";

import Tabs from "./components/Tabs";
import { TAB_ITEMS } from "./common/constants";

import "./App.css";

const App: React.FC = () => {
    return (
        <div className="app">
            <Tabs items={TAB_ITEMS} />
        </div>
    );
};

export default App;
