import { useState } from 'react';

/**
 * Open State React Hooks
 *
 * @param defaultState
 * @returns
 */
export const useIsOpenControls = (defaultState = false): OpenControls => {
    const [isVisible, setVisibility] = useState(defaultState);

    const handleClose = () => setVisibility(false);
    const handleOpen = () => setVisibility(true);
    const handleToggle = () => setVisibility(!isVisible);

    return {
        isVisible,
        handleClose,
        handleOpen,
        handleToggle,
        isOpen: isVisible,
    };
};
