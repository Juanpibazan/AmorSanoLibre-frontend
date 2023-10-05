import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from 'react-icons/bs';
import ReactAudioPlayer from 'react-audio-player';


const Player = ({audioElem,isPlaying})=>{
    const [audio,setAudio] = useState(null);
    const [progress, setProgress] = useState({started: false, pc:0});
    const [progressMsg,setProgressMsg] = useState('');

    const loadAudio = async ()=>{
        if(!audio){
            setProgressMsg('No audio selected');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(audio);
        reader.onload = (result)=>{
            setAudio(result);
        };
        setProgressMsg('Uploading...');
        setProgress(prevState => {
            return {...prevState,started:true}
        });
    };

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
                //src='https://stormy-ridge-57109-180df8a72b27.herokuapp.com/https://amorsanoylibre.blob.core.windows.net/amorsanoylibre/YourAudioFile.wav?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-11-01T00:30:44Z&st=2023-10-04T16:30:44Z&spr=https,http&sig=9U54HHlNcT%2BcRNnoLX83v0ONY1Xj2lNWnsoRRnOUzoA%3D'
                src={audio}
                controls
                autoPlay
                />
                <BsFillPlayCircleFill onClick={playOrPause} />
                <input type='file' onChange={(e)=>setAudio(e.target.files[0])} />
                            {audio && <button onClick={loadAudio}>Subir audio</button>}
                            {progress.started && (
                                <div>
                                    <h4>{progress.pc}%</h4>
                                    <progress style={{color:'#00bd86'}} max="100" value={progress.pc} ></progress>
                                </div>
                            )}
            </div>
        </div>
    )
};

export default Player;