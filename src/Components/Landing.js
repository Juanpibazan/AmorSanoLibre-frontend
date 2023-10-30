import React, {useState,useEffect} from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { useStateValue } from '../context/StateProvider';
import { actionTypes } from '../context/reducer';
import Logo from '../img/brandLogo.PNG';
import SadCouple from '../img/Otros_En_Combates.png';
import CryingPerson from '../img/sad_woman.jpg';
import CoupleOnTable from '../img/couple_yelling.jpg';

const Landing = ()=>{

    const [{session}, dispatch] = useStateValue();
    const navigate = useNavigate();

    useEffect(()=>{
        if(session !== null){
            const session_id = uuidv4();
            const current_time = moment().format("YYYY-MM-DD HH:mm:ss");
            const expiration_time = moment(current_time).add(20,'minutes').format("YYYY-MM-DD HH:mm:ss");
            dispatch({
                type: actionTypes.SET_SESSION,
                session: {
                    session_id,
                    expiration_time
                }});
    
            localStorage.setItem('session', JSON.stringify({session_id,expiration_time}));
        }

    },[]);

    useEffect(()=>{
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
            }
        }
        setInterval(()=>{
            createCurrentDT();
        },1000);
    },[]);




    return (
        <div className='Landing'>
            <div className='landing-container'>
                <div className='landing-left-container'>
                    <div>
                        <h1 style={{fontSize:'40px'}}>¿Sientes que algo falta en tu relación?</h1>
                        <h1 style={{color:'#fff'}}>Pregunta a Via Amoris y nuestra IA te dará un consejo</h1>
                    </div>

                    <button onClick={()=>navigate('/ask')}>Comienza a preguntar</button>
                </div>
                <div className='landing-right-container'>
                    <div className='landing-img-container'>
                        <img src={SadCouple} />
                    </div>
                </div>
            </div>
            <div className='what-is-viamoris-container'>
                <div className='what-is-viamoris-container-question1'>
                    <h1 style={{fontSize:'40px'}}>¿Estás en tu auto y quieres terapia?</h1>
                    <h1 style={{color:'#fff'}}>Solo necesitas sacar tu celular y entrar a VIA AMORIS</h1>
                    <button onClick={()=>navigate('/ask')} >Consulta a nuestra IA</button>
                </div>
                <div className='what-is-viamoris-container-image1'>
                    <img src={CryingPerson} />
                </div>
                {/*<p>Via Amoris nace de una relación verdadera entre un joven y su pareja. Este joven era inexperto en relaciones amorosas y de paso le faltaba amor propio.
                    Como te puedes imaginar, ésta no es una buena combinación. Fue todo un reto para él poder aportar lo suficiente a la relación, practicar un amor sano, dejar el miedo atrás y al mismo tiempo crecer en amor propio. Qué le habrías sugerido a este joven que haga? . . . Tal vez ir a terapia? Pues eso hizo y le ayudó mucho, sin embargo no puedes tener a tu terapeuta en el bolsillo y hacerle preguntas o contarle emociones y buscar su consejo cuando estas viviendo una situación real que te representa un reto. O por lo menos eso es lo que pensabamos....</p>*/}
                <div className='what-is-viamoris-container-image2'>
                    <img src={CoupleOnTable} />
                </div>
                <div className='what-is-viamoris-container-question2'>
                    <h1 style={{fontSize:'40px'}}>¿Cansado de peleas?</h1>
                    <h1 style={{color:'#fff'}}>Confía en Via Amoris. Pídele un consejo</h1>
                    <button onClick={()=>navigate('/ask')} >¿Consejo?</button>
                </div>

            </div>
        </div>
    )

};

export default Landing;