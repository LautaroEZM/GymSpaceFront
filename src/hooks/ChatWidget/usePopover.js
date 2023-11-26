import React, { useState } from 'react';

const usePopover = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const openPopover = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closePopover = () => {
        setAnchorEl(null);
    };

    return { anchorEl, openPopover, closePopover };
};

export default usePopover;