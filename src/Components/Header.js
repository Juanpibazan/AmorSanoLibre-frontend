import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../img/brandLogo.PNG';

const Header = ()=>{

    return (
        <div>
            <nav className='nav-bar'>
                <div className='logo-container'>
                    <Link to='/'><img width='200px' height='200px' src={Logo} /></Link>
                </div>
                <ul className='nav-list'>
                    <li><Link to={'/ask'} >Get Started</Link></li>
                    <li><Link to={'/'}>Sign Up</Link></li>
                    <li><Link to={'/'}>Log In</Link></li>
                    <li><Link to={'/'}>Upgrade</Link></li>
                </ul>
            </nav>
        </div>
    )
};

export default Header;