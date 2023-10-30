import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import HappyMan from '../img/happy_man.jpg';
import { actionTypes } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';


const GoPremium = ()=>{

    const [{user},dispatch] = useStateValue();

    const navigate = useNavigate();

    return (
        <div>
            <h1 className='go-premium-title'>Pásate a Premium ya y empieza a disfrutar de todos sus beneficios</h1>
            <div className='premium-container'>
                <div className='benefits-container'>
                    <h2>Lo que ganas con premium:</h2>
                    <ul className='benefits-list'>
                        <li>Consultas ilimitadas</li>
                        <li>Crear tu propio historial y ajustar el modelo para tomar en cuenta tu historial antes de responder</li>
                    </ul>
                </div>

                <div className='happy-man-container'>
                    <img src={HappyMan} />
                </div>
                <button className='go-premium-btn' onClick={()=> !user ? navigate('/login') : navigate('/payments')} >Pásate a Premium solo por 7 Bs. al mes</button>
            </div>
        </div>
    )
};

export default GoPremium;