import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useStateValue } from '../context/StateProvider';
import { actionTypes } from '../context/reducer';

const Login = ()=>{

    const [email,setEmail] = useState('');
    const [emailHidden, setEmailHidden] = useState(false);
    const [password,setPassword] = useState('');
    const [passwordHidden, setPasswordHidden] = useState(true);

    const [passVisible, setPassVisible] = useState(false);
    const [{user,session},dispatch] = useStateValue();

    const navigate = useNavigate();

    const nextInput = async ()=>{
        if(!emailHidden && email !==''){
            setPasswordHidden(!passwordHidden);
            setEmailHidden(!emailHidden);
        } else if(!passwordHidden && password !==''){
            try{
                const id = toast.loading("Por favor espere...",{
                    closeOnClick:true
                });
                const response = await axios({
                    method:'post',
                    url:'https://stormy-ridge-57109-180df8a72b27.herokuapp.com/https://amorsanoylibre.azurewebsites.net/users/login',
                    data:{
                        email,
                        password
                    },
                    headers:{
                        'Content-Type':'application/json'
                    }
                });
                if(response.status===200){
                    //alert('Usuario agregado!');
                    const session_id = uuidv4();
                    const current_time = moment().format("YYYY-MM-DD HH:mm:ss");
                    const expiration_time = moment(current_time).add(20,'minutes').format("YYYY-MM-DD HH:mm:ss");
                    toast.update(id,{render:response.data.message, type:'success',isLoading:false});
                    dispatch({
                        type: actionTypes.SET_USER,
                        user: response.data.user
                    });
                    dispatch({
                        type: actionTypes.SET_SESSION,
                        session: {
                            session_id,
                            expiration_time
                        }
                    });
                    localStorage.setItem('user',JSON.stringify(response.data.user))
                    localStorage.setItem('session', JSON.stringify({session_id,expiration_time}))
                    setTimeout(()=>navigate('/ask'),6000);
                    //return toast('Usuario agregado!');
                } else{ 
                    toast.update(id,{render:'Inicio de sesion incorrecto', type:'error',isLoading:false});
                    
                }
            } catch(err){
                console.log(err.response.data.message);
                toast(err.response.data.message,{
                    type:'error',
                    position:'top-center'
                });
                //alert(err);
            }

        }
    };

    const lastInput = ()=>{
        if(!passwordHidden){
            setPasswordHidden(!passwordHidden);
            setEmailHidden(!emailHidden);
        }
    }

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

    useEffect(()=>{
        const makePassVisible = ()=>{
            if(passVisible){
                document.getElementById('password').setAttribute('type','text');
            } else {
                document.getElementById('password').setAttribute('type','password');
            }
        };
        makePassVisible();
    },[passVisible]);


    return (
        <div className='Login' style={{textAlign:'center', color:'#fff',padding:'0.5rem 0.5rem',overflow:'visible'}}>
            <h1 style={{display:'flex', justifyContent:'center', alignItems:'center',verticalAlign:'middle', lineHeight:'100%',height:'30%'}}>Inicia sesión en Via Amoris</h1>
            <h2 style={{fontSize:'50px'}}>Por favor ingresa tus credenciales</h2>
            <div style={{textAlign:'center',display:'flex',justifyContent:'space-evenly'}}>
                <button id='register-back-btn'  className='register-btn' onClick={lastInput}>Atrás</button>
                <div className='register-input-container' >
                    <input type='email' required={true} hidden={emailHidden} placeholder='E-mail' value={email} onChange={(e)=>setEmail(e.target.value)}  />
                    <input type='password' id='password' required={true} hidden={passwordHidden} placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}  /><span style={passwordHidden ? {display:'none'} : {display:'inline'}} onClick={()=>setPassVisible(!passVisible)}>{passVisible ? <AiOutlineEyeInvisible style={{fontSize:'25px',fontWeight:'bold',color:'#254e77'}}/> : <AiOutlineEye style={{fontSize:'25px',fontWeight:'bold',color:'#254e77'}} />}</span>
                </div>
                <button id='register-next-btn' className='register-btn'  onClick={nextInput}>{!passwordHidden ? 'Iniciar sesión' : 'Siguiente'}</button>
            </div>
            <ToastContainer position='top-center' />
        </div>
    )
};

export default Login;