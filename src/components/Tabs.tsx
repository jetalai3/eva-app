import React, { ReactElement, useState } from "react"
import TabHeader from "./TabHeader"

type TabsProps = {
    children: ReactElement[]
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
    const [selectedTab, setSelectedTab] = useState(0)

    return (
        <div>
            <ul>
                {children.map((item, index) => (
                    <TabHeader
                        key={index}
                        header={item.props.title}
                        index={index}
                        setSelectedTab={setSelectedTab}
                    />
                ))}
            </ul>
            {children[selectedTab]}
        </div>
    )
}

export default Tabs;
