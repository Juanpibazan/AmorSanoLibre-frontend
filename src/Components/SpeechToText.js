import React, {useState,useEffect,useRef} from 'react';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import axios from 'axios';
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from 'react-icons/bs';
import { Howl } from 'howler';

//import Player from './Player';

const SpeechToText = ()=>{

    const [text,setText] = useState('');
    const [respuesta,setRespuesta] = useState('');
    const [completion,setCompletion] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);

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
                prompt: transcript
               },
            headers:{
                "Content-Type":"application/json"
            }
        });
        console.log(data);
        setRespuesta(data.respuesta);
    };

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
        console.log(data);

    };

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

    const audioPlay = (audio)=>{
        const sound = new Howl({
            src:audio,
            html5:true
        });
        sound.play();
        console.log('PLAYING!!');
    };

    
    useEffect(()=>{
        setText(transcript);
    },[transcript]);
    
    useEffect(()=>{
        const makePostCall = ()=>{
            if(text!=='' && !listening){
                sendPrompt(text);
                console.log('completionRef: ',completionRef);
                setCompletion(completionRef.current.innerText);
            };
        };
        makePostCall();
        //speak(completion);

        console.log('Text:', text);
        console.log('Listening:', listening);
    },[text,listening]);

    useEffect(()=>{
        /*const makeItSpeak = (msg)=>{
            if(completion!=='' & !listening){
                //speak(completion);
                //msg.text = 'Hola chat';
                msg.text = completion;
                window.speechSynthesis.speak(msg);
            }
        };
        makeItSpeak(msg);*/
        speak(respuesta);
    },[respuesta,listening]);


    if(!browserSupportsSpeechRecognition){
        return (
            <span>
                Browser doesn't support speech recognition.
            </span>
        )
    }


    return (
        <div>
            Speech To Text
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
                <BsFillPlayCircleFill style={{width:'100px',height:'100px',cursor:'pointer'}} onClick={audioPlay('https://amorsanoylibre.blob.core.windows.net/amorsanoylibre/YourAudioFile.wav?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-11-01T00:30:44Z&st=2023-10-04T16:30:44Z&spr=https,http&sig=9U54HHlNcT%2BcRNnoLX83v0ONY1Xj2lNWnsoRRnOUzoA%3D')} />
                {/*<BsFillPauseCircleFill style={{width:'100px',height:'100px',cursor:'pointer'}} onClick={()=>setIsPlaying(false)} /> */}
            </div>
            )}
        </div>
    )
};

export default SpeechToText;