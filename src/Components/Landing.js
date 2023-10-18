import React, {useState,useEffect} from 'react';
import moment from 'moment';

import { useStateValue } from '../context/StateProvider';
import { actionTypes } from '../context/reducer';

const Landing = ()=>{

    const [{session}, dispatch] = useStateValue();

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
            LANDING
        </div>
    )

};

export default Landing;