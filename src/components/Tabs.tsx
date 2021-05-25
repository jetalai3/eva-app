import React, { useState } from "react";
import TabHeader from "./TabHeader";

type TabsProps = {
    items: Array<{ title: string, content: React.FC }>
};

const Tabs: React.FC<TabsProps> = ({ items }) => {
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const TabComponent = items[selectedTab].content;
    return (
        <>
            {items.map((item, index) => (
                <TabHeader
                    key={index}
                    header={item.title}
                    index={index}
                    setSelectedTab={setSelectedTab}
                />
            ))}
            <TabComponent />
        </>
    );
};

export default Tabs;
