import React, {useState,useEffect,useRef} from 'react';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import axios from 'axios';

const SpeechToText = ()=>{

    const [text,setText] = useState('');
    const [respuesta,setRespuesta] = useState('');
    const [completion,setCompletion] = useState('');

    const completionRef = useRef();
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
    },[respuesta]);


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
        </div>
    )
};

export default SpeechToText;