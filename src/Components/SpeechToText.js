import React, {useState,useEffect,useRef} from 'react';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import axios from 'axios';
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from 'react-icons/bs';
import { BiRefresh } from 'react-icons/bi';
import { Howl } from 'howler';
import moment from 'moment';

import { useStateValue } from '../context/StateProvider';
import { actionTypes } from '../context/reducer';


//import Player from './Player';

const SpeechToText = ()=>{

    const [{session,user},dispatch] = useStateValue();
    const [text,setText] = useState('');
    const [respuesta,setRespuesta] = useState('');
    const [completion,setCompletion] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [howlSound, setHowlSound] = useState(null);
    const [maxRequests, setMaxRequests] = useState(0);
    const [ip, setIp] = useState('');
    const [voiceType, setVoiceType] = useState(user ? user.voice_type : '');

    const completionRef = useRef();
    const audioElem =useRef();
 
    /*const msg = new SpeechSynthesisUtterance();
    msg.lang = "es";*/

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
        } = useSpeechRecognition();

    const sendPrompt = async (transcript)=>{
        const {data} = await axios({
            method:'post',
            url:'https://stormy-ridge-57109-180df8a72b27.herokuapp.com/https://amorsanoylibre.azurewebsites.net/completions/',
            data:{
                prompt: transcript,
                ipAddress: ip,
                requestType: user ? 'sr' :'ur',
                voiceType: voiceType
               },
            headers:{
                "Content-Type":"application/json"
            }
        });
        console.log(data);
        setRespuesta(data.respuesta);
        //setHowlSound(null);
        //createSound('https://amorsanoylibre.blob.core.windows.net/amorsanoylibre/YourAudioFile.wav?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-11-01T00:30:44Z&st=2023-10-04T16:30:44Z&spr=https,http&sig=9U54HHlNcT%2BcRNnoLX83v0ONY1Xj2lNWnsoRRnOUzoA%3D');
    };

    /*const speak = async (text)=>{
        const {data} = await axios({
            method:'post',
            url:'https://stormy-ridge-57109-180df8a72b27.herokuapp.com/https://amorsanoylibre.azurewebsites.net/completions/speak',
            data:{
                completion: text
               },
            headers:{
                "Content-Type":"application/json"
            }
        });
        console.log('Response from /speak endpoint: ',data);

    };*/

    /*useEffect(()=>{
        const manageSound = ()=>{
            const sound = new Howl({
                src:'https://amorsanoylibre.blob.core.windows.net/amorsanoylibre/YourAudioFile.wav?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-11-01T00:30:44Z&st=2023-10-04T16:30:44Z&spr=https,http&sig=9U54HHlNcT%2BcRNnoLX83v0ONY1Xj2lNWnsoRRnOUzoA%3D',
                html5:true
            });
            if(isPlaying){
                sound.play();
            } else{
                sound.pause();
            }
        
        };
        manageSound();
    },[isPlaying]);*/

    const createSound = (audio)=>{
        const sound = new Howl({
            src:audio,
            html5:true,
            autoplay: true
        });
        return setHowlSound(sound);
        //sound.play();
        //console.log('PLAYING!!');
    };


    useEffect(()=>{
        if(transcript!==''){
            setText(transcript);
        }
        return;
    },[transcript]);
    
    useEffect(()=>{
        const makePostCall = ()=>{
            if(text!=='' && !listening){
                sendPrompt(text);
                //console.log('completionRef: ',completionRef);
                //setCompletion(completionRef.current.innerText);
            };
        };
        makePostCall();
        //speak(completion);
        console.log('Text:', text);
        console.log('Listening:', listening);
    },[listening]);

    useEffect(()=>{
        const speak = async (text)=>{
            const {data} = await axios({
                method:'post',
                url:'https://stormy-ridge-57109-180df8a72b27.herokuapp.com/https://amorsanoylibre.azurewebsites.net/completions/speak',
                data:{
                    completion: text
                   },
                headers:{
                    "Content-Type":"application/json"
                }
            });
            console.log('Response from /speak endpoint: ',data);
            setTimeout(()=>{
                createSound('https://amorsanoylibre.blob.core.windows.net/amorsanoylibre/YourAudioFile.wav?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-11-01T00:30:44Z&st=2023-10-04T16:30:44Z&spr=https,http&sig=9U54HHlNcT%2BcRNnoLX83v0ONY1Xj2lNWnsoRRnOUzoA%3D');
            },5000);
        };
        if(respuesta !== ''){
            console.log('completionRef: ',completionRef);
            setCompletion(respuesta);
            speak(respuesta);
            console.log(`speak(${respuesta})`);
        }
    },[respuesta]);

    const audioPlay = ()=>{
        //const sound = createSound(audio);
        howlSound.play();
        console.log('PLAYING!!');
    };

    const audioPause = ()=>{
        //const sound = createSound(audio);
        howlSound.pause();
        console.log('PAUSED!!');
    };

    const refeshAudio = ()=>{
        howlSound.stop();
        howlSound.unload();
        setHowlSound(null);
        createSound('https://amorsanoylibre.blob.core.windows.net/amorsanoylibre/YourAudioFile.wav?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-11-01T00:30:44Z&st=2023-10-04T16:30:44Z&spr=https,http&sig=9U54HHlNcT%2BcRNnoLX83v0ONY1Xj2lNWnsoRRnOUzoA%3D');
    };

    useEffect(()=>{
        const getIPAddress = async ()=>{
            const {data} = await axios({
                method:'get',
                url:'https://api.ipify.org/?format=json',
                headers:{
                    'Content-Type':'application/json'
                }
            });
            console.log('My IP Address: ', data.ip);
            setIp(data.ip);
            if(data.ip !== null && user === null){
                const response = await axios({
                    method:'post',
                    url:'https://stormy-ridge-57109-180df8a72b27.herokuapp.com/https://amorsanoylibre.azurewebsites.net/completions/recordIPAddress',
                    data: {
                        ipAddress: data.ip
                    },
                    headers:{
                        'Content-Type':'application/json'
                    }
                });
                if(response.status===201){
                    console.log(response.data);
                }
            }

        };
        const createCurrentDT = ()=>{
            if(session !== null){
                const current_dt = moment().format("YYYY-MM-DD HH:mm:ss");
                const exp_time = session.expiration_time;
                if(current_dt===exp_time){
                    dispatch({
                        type: actionTypes.SET_SESSION,
                        session:null
                    });
                    localStorage.removeItem('session');
                }
            };
        }
        getIPAddress();
        setInterval(()=>{
            createCurrentDT();
        },1000);
    },[]);


    if(!browserSupportsSpeechRecognition){
        return (
            <span>
                Browser doesn't support speech recognition.
            </span>
        )
    }


    return (
        <div className='SpeechToText'>
            Speech To Text
            {!user && (
                <select value={voiceType} onChange={(e)=>setVoiceType(e.target.value)}>
                    <option value='Marcelo'>Marcelo</option>
                    <option value='Patricia'>Patricia</option>
                </select>
            )}
            <p>Microphone { listening ? 'on' : 'off' }</p>
            <button onClick={()=>SpeechRecognition.startListening({
                language:'es'
            })}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <p>{transcript}</p>
            <div>
                <p ref={completionRef}>{respuesta}</p>
            </div>
            {/*<audio ref={audioElem} src='https://stormy-ridge-57109-180df8a72b27.herokuapp.com/https://amorsanoylibre.blob.core.windows.net/amorsanoylibre/YourAudioFile.wav?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-11-01T00:30:44Z&st=2023-10-04T16:30:44Z&spr=https,http&sig=9U54HHlNcT%2BcRNnoLX83v0ONY1Xj2lNWnsoRRnOUzoA%3D' />*/}
            {respuesta!=='' && (
            <div>
                <BsFillPlayCircleFill style={{width:'100px',height:'100px',cursor:'pointer'}} onClick={()=>audioPlay()} />
                <BsFillPauseCircleFill style={{width:'100px',height:'100px',cursor:'pointer'}} onClick={()=>audioPause()} />
                <BiRefresh style={{width:'100px',height:'100px',cursor:'pointer'}} onClick={refeshAudio} />
            </div>
            )}
        </div>
    )
};

export default SpeechToText;