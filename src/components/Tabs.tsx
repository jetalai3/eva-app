import React, { ReactElement, useState } from "react"
import TabHeader from "./TabHeader"

type TabsProps = {
    children: ReactElement[]
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
    const [selectedTab, setSelectedTab] = useState(0)

    return (
        <div>
            <div className="btn-group" role="group" aria-label="Basic example">
                {children.map((item, index) => (
                    <TabHeader
                        key={index}
                        header={item.props.title}
                        index={index}
                        setSelectedTab={setSelectedTab}
                    />
                ))}
            </div>
            {children[selectedTab]}
        </div>
    )
}

export default Tabs;
