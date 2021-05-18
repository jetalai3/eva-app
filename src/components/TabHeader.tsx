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
        <button type="button" className="btn btn-primary" onClick={onClick}>{header}</button>
    )
}

export default TabHeader