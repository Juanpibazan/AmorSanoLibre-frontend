import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from 'react-icons/bs';
import ReactAudioPlayer from 'react-audio-player';


const Player = ({audioElem,isPlaying})=>{
    const playOrPause = ()=>{
        audioElem.current.play();
    };

    const requestAudio = async ()=>{
        const response = await axios({
            method: 'get',
            url: 'https://stormy-ridge-57109-180df8a72b27.herokuapp.com/https://amorsanoylibre.blob.core.windows.net/amorsanoylibre/YourAudioFile.wav?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-11-01T00:30:44Z&st=2023-10-04T16:30:44Z&spr=https,http&sig=9U54HHlNcT%2BcRNnoLX83v0ONY1Xj2lNWnsoRRnOUzoA%3D',
            headers:{
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        console.log('AUDIO-RESPONSE: ',response)
    };

    return (
        <div>
            <div>
                <ReactAudioPlayer
                src='https://stormy-ridge-57109-180df8a72b27.herokuapp.com/https://amorsanoylibre.blob.core.windows.net/amorsanoylibre/YourAudioFile.wav?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-11-01T00:30:44Z&st=2023-10-04T16:30:44Z&spr=https,http&sig=9U54HHlNcT%2BcRNnoLX83v0ONY1Xj2lNWnsoRRnOUzoA%3D'
                controls
                autoPlay
                />
                <BsFillPlayCircleFill onClick={requestAudio} />
            </div>
        </div>
    )
};

export default Player;