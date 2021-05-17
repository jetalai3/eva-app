import React, { ReactElement } from 'react'

type TabProps = {
    title: string,
    child: ReactElement,
}

const Tab: React.FC<TabProps> = ({ child }) => {
    return <div>{child}</div>
}

export default Tab;
