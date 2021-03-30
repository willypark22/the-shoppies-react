import React, { useLayoutEffect, useState } from 'react';

const NominateButton = ({ movieCounter, handleAdd, names, nomination }) => {

    if(nomination.find(item => item === names)) {
        return (
            <button disabled={true} onClick={() => handleAdd(names)}>NOMINATED!</button>
        )
    }
    else {
        return (
            <button disabled={false} onClick={() => handleAdd(names)}>NOMINATE</button>
        )
    }
}

export default NominateButton;