import { useCallback, useState } from "react";

const useToggle = () => {
    const [toggled, setToggled] = useState(false);

    const onToggledChange = useCallback(() => {
        setToggled(prevToggle => !prevToggle);
    }, []);

    return { toggled, onToggledChange };
};

export default useToggle;
