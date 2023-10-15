import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

    const [{user,dispatch}] = useStateValue();

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
                const id = toast.loading("Por favor espere...");
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
                    toast.update(id,{render:'Usuario agregado!', type:'success',isLoading:false});
                    dispatch({
                        type: actionTypes.SET_USER,
                        user: {email,firstName,lastName}
                    });
                    localStorage.setItem('user',JSON.stringify({email,firstName,lastName}))
                    setTimeout(()=>navigate('/'),6000);
                    //return toast('Usuario agregado!');
                }
            } catch(err){
                alert(err);
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
        console.log(email);
        console.log(birthDate);
    },[birthDate]);

    return (
        <div style={{textAlign:'center', color:'#fff'}}>
            <h1>Registrate en Via Amoris</h1>
            <h4>Comparte con nosotros algunos de tus datos para poder ofrecerte una mejor experiencia</h4>
            <div style={{textAlign:'center',display:'flex',justifyContent:'space-evenly'}}>
                <button onClick={lastInput}>Atrás</button>
                <div >
                    <input type='email' required={true} hidden={emailHidden} placeholder='E-mail' value={email} onChange={(e)=>setEmail(e.target.value)}  />
                    <input type='password' required={true} hidden={passwordHidden} placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}  />
                    <input type='text' required={true} hidden={firstNameHidden} placeholder='Nombres' value={firstName} onChange={(e)=>setFirstName(e.target.value)}  />
                    <input type='text' required={true} hidden={lastNameHidden} placeholder='Apellidos' value={lastName} onChange={(e)=>setLastName(e.target.value)}  />
                    <input type='date' required={true} hidden={birthDateHidden} placeholder='Fecha de Nacimiento' value={birthDate} onChange={(e)=>setBirthDate(e.target.value.toString())}  />
                    <div style={!genderHidden ? {display:'block'} : {display:'none'}}>
                        <label>Género</label>
                        <div style={!genderHidden ? {display:'flex',justifyContent:'space-evenly',width:'100%'} : {display:'none'}}>
                            <input required={true} type='radio' name='gender' hidden={genderHidden} value='Masculino' onChange={(e)=>setGender(e.target.value)}  />Masculino
                            <input required={true} type='radio' name='gender' hidden={genderHidden} value='Femenino' onChange={(e)=>setGender(e.target.value)}  />Femenino
                        </div>
                    </div>
                    <div style={!voiceTypeHidden ? {display:'block'} : {display:'none'}}>
                        <label>Tipo de Voz para tu orientador</label>
                        <div style={!voiceTypeHidden ? {display:'flex',justifyContent:'space-evenly',width:'100%'} : {display:'none'}}>
                            <input type='radio' name='voice_type' hidden={voiceTypeHidden} value='Marcelo' onChange={(e)=>setVoiceType(e.target.value)}  />Marcelo
                            <input type='radio' name='voice_type' hidden={voiceTypeHidden} value='Patricia' onChange={(e)=>setVoiceType(e.target.value)}  />Patricia
                        </div>
                    </div>
                </div>
                <button onClick={nextInput}>{!voiceTypeHidden ? 'Finalizar' : 'Siguiente'}</button>
            </div>
            <ToastContainer position='top-center' />
        </div>
    )
};

export default Register;