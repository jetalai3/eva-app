import React, { useCallback } from "react"

type TabHeaderProps = {
    header: string
    index: number
    setSelectedTab: (index: number) => void
}

const TabHeader: React.FC<TabHeaderProps> = ({ header, setSelectedTab, index }) => {

    const onClick = useCallback(() => {
        setSelectedTab(index)
    }, [setSelectedTab, index])

    return (
        <li>
            <button onClick={onClick}>{header}</button>
        </li>
    )
}

export default TabHeader