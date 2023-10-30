import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { CgMenuOreos } from 'react-icons/cg';
import Logo from '../img/brandLogo.PNG';
import Logo3 from '../img/brandlogo3.PNG';

import { useStateValue } from '../context/StateProvider';
import { actionTypes } from '../context/reducer';

const Header = ()=>{

    const [{user},dispatch] = useStateValue();

    const logOut = ()=>{
        dispatch({
            type:actionTypes.SET_USER,
            user:null
        });
        localStorage.removeItem('user');
    };

    return (
        <div>
            <nav className='nav-bar'>
                <div className='logo-container'>
                    <Link to='/'><img width='250px' height='250px' src={Logo3} /></Link>
                </div>
                <div className='menu-icon'><CgMenuOreos /></div>
                <ul className='nav-list'>
                    <li><Link to={'/ask'} >Comienza con tus consultas</Link></li>
                    { !user && (
                            <li><Link to={'/register'}>Regístrate</Link></li>
                    )}
                    {!user && (
                        <li><Link to={'/login'}>Inicia Sesión</Link></li>
                    )}
                    <li><Link to={'/go-premium'}>Ilumina tu camino aún más (Premium)</Link></li>
                    {user && (
                        <li><Link onClick={logOut} to={'/'}>Cerrar Sesión</Link></li>
                    )}
                </ul>
            </nav>
        </div>
    )
};

export default Header;