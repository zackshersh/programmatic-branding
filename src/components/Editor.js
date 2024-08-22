import React, { useEffect, useState } from 'react';

import GraphicsManager from '../scripts/GraphicsManager';

function Editor(props) {

    const [ graphicsManager, setGraphicsManager ] = useState(new GraphicsManager("canv"));

    useEffect(() => {
        graphicsManager.init();
    },[])

    return (
        // <div className='w-[100vw] h-[100vh] bg-neutral-400'>
        <div className='w-[100vw] h-[100vh] bg-neutral-400 flex justify-center items-center'>
            <canvas className='shadow-lg shadow-neutral-500' id='canv'></canvas>
        </div>
    );
}

export default Editor;