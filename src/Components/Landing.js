import React, {useState,useEffect} from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { useStateValue } from '../context/StateProvider';
import { actionTypes } from '../context/reducer';
import Logo from '../img/brandLogo.PNG';

const Landing = ()=>{

    const [{session}, dispatch] = useStateValue();
    const navigate = useNavigate();

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
            };
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
                        <h1>Quieres mejorar en tus relaciones?</h1>
                        <h3>Y con relaciones nos referimos a la relación contigo mismo, con tu pareja o con amigos y familiares...</h3>
                    </div>
                    <div className='left-pitch-container'>
                        <p> Con Via Amoris lo puedes hacer y más rápido de lo que piensas. Deja que nuestro Orientador basado en IA te de las pautas y respuestas accionables que necesitas. Deja que iluminen tu camino y te acerquen al amor.</p>
                    </div>
                    <button onClick={()=>navigate('/ask')}>Comienza a preguntar</button>
                </div>
                <div className='landing-right-container'>
                    <div className='landing-img-container'>
                        <img src={Logo} />
                    </div>
                </div>
            </div>
            <div className='what-is-viamoris-container'>
                <h1>De dónde nace Via Amoris?</h1>
                <p>Via Amoris nace de una relación verdadera entre un joven y su pareja. Este joven era inexperto en relaciones amorosas y de paso le faltaba amor propio.
                    Como se pueden imaginar, ésta no es una buena combinación. Fue todo un reto para él poder aportar lo suficiente a la relación, practicar un amor sano, dejar el miedo atrás y al mismo tiempo crecer en amor propio. Qué le habrías sugerido a este joven que haga? ......Tal vez ir a terapia? Pues eso hizo y le ayudó mucho, sin embargo no puedes tener a tu terapeuta en el bolsillo y hacerle preguntas o contarle emociones y buscar su consejo cuando estas viviendo una situación real que te representa un reto. O por lo menos eso es lo que pensabamos....</p>
                <p>Para resolver este problema y actuar como tu terapeuta de bolsillo llegó Via Amoris</p>
                <button onClick={()=>navigate('/ask')} >Consulta a tu Orientador</button>
            </div>
        </div>
    )

};

export default Landing;