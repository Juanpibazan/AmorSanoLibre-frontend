import React, {useState, useEffect} from 'react';
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from 'react-icons/bs';


const Player = ({audioElem,isPlaying})=>{
    const playOrPause = ()=>{
        audioElem.current.play();
    };

    return (
        <div>
            <div>
                <BsFillPlayCircleFill onClick={playOrPause} />

            </div>
        </div>
    )
};

export default Player;