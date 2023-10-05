import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from 'react-icons/bs';
import ReactAudioPlayer from 'react-audio-player';
import { Howl } from 'howler';


const Player = ()=>{
    const [audio,setAudio] = useState(null);
    const [progress, setProgress] = useState({started: false, pc:0});
    const [progressMsg,setProgressMsg] = useState('');


    /*
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
    };*/

    const audioPlay = (audio)=>{
        const sound = new Howl({
            src:audio,
            html5:true
        });
        sound.play()
    };

    return (
        <div>
            <div>
                <BsFillPlayCircleFill onClick={audioPlay('https://stormy-ridge-57109-180df8a72b27.herokuapp.com/https://amorsanoylibre.blob.core.windows.net/amorsanoylibre/YourAudioFile.wav?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-11-01T00:30:44Z&st=2023-10-04T16:30:44Z&spr=https,http&sig=9U54HHlNcT%2BcRNnoLX83v0ONY1Xj2lNWnsoRRnOUzoA%3D')} />
            </div>
        </div>
    )
};

export default Player;