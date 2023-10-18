import React, {useEffect, useState} from 'react';
import { json, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useStateValue } from '../context/StateProvider';
import { actionTypes } from '../context/reducer';

const Register = ()=>{

    const [email,setEmail] = useState('');
    const [emailHidden, setEmailHidden] = useState(false);
    const [password,setPassword] = useState('');
    const [passwordHidden, setPasswordHidden] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [firstNameHidden, setFirstNameHidden] = useState(true);
    const [lastName, setLastName] = useState('');
    const [lastNameHidden, setLastNameHidden] = useState(true);
    const [birthDate, setBirthDate] = useState();
    const [birthDateHidden, setBirthDateHidden] = useState(true);
    const [gender,setGender] = useState('');
    const [genderHidden, setGenderHidden] = useState(true);
    const [voiceType, setVoiceType] = useState('');
    const [voiceTypeHidden, setVoiceTypeHidden] = useState(true);

    const [passVisible, setPassVisible] = useState(false);
    const [{user,session},dispatch] = useStateValue();

    const navigate = useNavigate();

    const nextInput = async ()=>{
        if(!emailHidden && email !==''){
            setPasswordHidden(!passwordHidden);
            setEmailHidden(!emailHidden);
        } else if(!passwordHidden && password !==''){
            setFirstNameHidden(!firstNameHidden);
            setPasswordHidden(!passwordHidden);
        } else if(!firstNameHidden && firstName !==''){
            setLastNameHidden(!lastNameHidden)
            setFirstNameHidden(!firstNameHidden);
        } else if(!lastNameHidden && lastName !==''){
            setBirthDateHidden(!birthDateHidden);
            setLastNameHidden(!lastNameHidden);
        } else if(!birthDateHidden && birthDate !==undefined){
            setGenderHidden(!genderHidden);
            setBirthDateHidden(!birthDateHidden);
        } else if(!genderHidden && gender !==''){
            setVoiceTypeHidden(!voiceTypeHidden);
            setGenderHidden(!genderHidden);
        } else if(!voiceTypeHidden && voiceType !==''){
            try{
                const id = toast.loading("Por favor espere...",{
                    closeOnClick:true
                });
                const response = await axios({
                    method:'post',
                    url:'https://stormy-ridge-57109-180df8a72b27.herokuapp.com/https://amorsanoylibre.azurewebsites.net/users/register',
                    data:{
                        email,
                        password,
                        firstName,
                        lastName,
                        birthDate,
                        gender,
                        voiceType
                    },
                    headers:{
                        'Content-Type':'application/json'
                    }
                });
                if(response.status===201){
                    //alert('Usuario agregado!');
                    const session_id = uuidv4();
                    const current_time = moment().format("YYYY-MM-DD HH:mm:ss");
                    const expiration_time = moment(current_time).add(2,'minutes').format("YYYY-MM-DD HH:mm:ss");
                    toast.update(id,{render:response.data.message, type:'success',isLoading:false});
                    dispatch({
                        type: actionTypes.SET_USER,
                        user: {email,firstName,lastName}
                    });
                    dispatch({
                        type: actionTypes.SET_SESSION,
                        session: {
                            session_id,
                            expiration_time
                        }
                    });
                    localStorage.setItem('user',JSON.stringify({email,firstName,lastName}))
                    localStorage.setItem('session', JSON.stringify({session_id,expiration_time}))
                    setTimeout(()=>navigate('/'),6000);
                    //return toast('Usuario agregado!');
                } else{ 
                    toast.update(id,{render:'Usuario no pudo ser agregado', type:'error',isLoading:false});
                    
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
        if(!voiceTypeHidden){
            setVoiceTypeHidden(!voiceTypeHidden);
            setGenderHidden(!genderHidden);
        } else if(!genderHidden){
            setGenderHidden(!genderHidden);
            setBirthDateHidden(!birthDateHidden);
        } else if(!birthDateHidden){
            setBirthDateHidden(!birthDateHidden);
            setLastNameHidden(!lastNameHidden);
        } else if(!lastNameHidden){
            setLastNameHidden(!lastNameHidden);
            setFirstNameHidden(!firstNameHidden);
        } else if(!firstNameHidden){
            setFirstNameHidden(!firstNameHidden);
            setPasswordHidden(!passwordHidden);
        } else if(!passwordHidden){
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
        <div className='Register' style={{textAlign:'center', color:'#fff',padding:'0.5rem 0.5rem',overflow:'visible'}}>
            <h1 style={{fontSize:'80px',display:'flex', justifyContent:'center', alignItems:'center',verticalAlign:'middle', lineHeight:'100%',height:'30%'}}>Registrate en Via Amoris</h1>
            <h2 style={{fontSize:'50px'}}>Comparte con nosotros algunos de tus datos para poder ofrecerte una mejor experiencia</h2>
            <div style={{textAlign:'center',display:'flex',justifyContent:'space-evenly'}}>
                <button id='register-back-btn'  className='register-btn' onClick={lastInput}>Atrás</button>
                <div className='register-input-container' >
                    <input type='email' required={true} hidden={emailHidden} placeholder='E-mail' value={email} onChange={(e)=>setEmail(e.target.value)}  />
                    <input type='password' id='password' required={true} hidden={passwordHidden} placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}  /><span style={passwordHidden ? {display:'none'} : {display:'inline'}} onClick={()=>setPassVisible(!passVisible)}>{passVisible ? <AiOutlineEyeInvisible style={{fontSize:'25px',fontWeight:'bold',color:'#254e77'}}/> : <AiOutlineEye style={{fontSize:'25px',fontWeight:'bold',color:'#254e77'}} />}</span>
                    <input type='text' required={true} hidden={firstNameHidden} placeholder='Nombres' value={firstName} onChange={(e)=>setFirstName(e.target.value)}  />
                    <input type='text' required={true} hidden={lastNameHidden} placeholder='Apellidos' value={lastName} onChange={(e)=>setLastName(e.target.value)}  />
                    <input type='date' required={true} hidden={birthDateHidden} placeholder='Fecha de Nacimiento' value={birthDate} onChange={(e)=>setBirthDate(e.target.value.toString())}  />
                    <div style={!genderHidden ? {display:'block',textAlign:'center'} : {display:'none'}}>
                        <label style={{fontSize:'30px', fontWeight:'bold',color:'#254e77'}}>Género</label>
                        <div className='radio-input-container' style={!genderHidden ? {display:'flex',justifyContent:'space-evenly',width:'100%'} : {display:'none'}}>
                            <input className='radio-input' required={true} type='radio' name='gender' hidden={genderHidden} value='Masculino' onChange={(e)=>setGender(e.target.value)}  /><span style={{fontSize:'30px'}}>Masculino</span>
                            <input className='radio-input' required={true} type='radio' name='gender' hidden={genderHidden} value='Femenino' onChange={(e)=>setGender(e.target.value)}  /><span style={{fontSize:'30px'}}>Femenino</span>
                        </div>
                    </div>
                    <div style={!voiceTypeHidden ? {display:'block'} : {display:'none'}}>
                        <label style={{fontSize:'30px', fontWeight:'bold',color:'#254e77'}}>Tipo de Voz para tu orientador</label>
                        <div className='radio-input-container' style={!voiceTypeHidden ? {display:'flex',justifyContent:'space-evenly',width:'100%'} : {display:'none'}}>
                            <input className='radio-input' type='radio' name='voice_type' hidden={voiceTypeHidden} value='Marcelo' onChange={(e)=>setVoiceType(e.target.value)}  /><span style={{fontSize:'30px'}}>Marcelo</span>
                            <input className='radio-input' type='radio' name='voice_type' hidden={voiceTypeHidden} value='Patricia' onChange={(e)=>setVoiceType(e.target.value)}  /><span style={{fontSize:'30px'}}>Patricia</span>
                        </div>
                    </div>
                </div>
                <button id='register-next-btn' className='register-btn'  onClick={nextInput}>{!voiceTypeHidden ? 'Finalizar' : 'Siguiente'}</button>
            </div>
            <ToastContainer position='top-center' />
        </div>
    )
};

export default Register;