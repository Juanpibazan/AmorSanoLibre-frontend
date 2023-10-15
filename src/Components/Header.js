import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../img/brandLogo.PNG';
import Logo3 from '../img/brandlogo3.PNG';

import { useStateValue } from '../context/StateProvider';

const Header = ()=>{

    const [{user},dispatch] = useStateValue();

    return (
        <div>
            <nav className='nav-bar'>
                <div className='logo-container'>
                    <Link to='/'><img width='250px' height='250px' src={Logo} /></Link>
                </div>
                <ul className='nav-list'>
                    <li><Link to={'/ask'} >Get Started</Link></li>
                    { !user && (
                            <li><Link to={'/register'}>Sign Up</Link></li>
                    )}
                    {!user && (
                        <li><Link to={'/'}>Log In</Link></li>
                    )}
                    <li><Link to={'/'}>Upgrade</Link></li>
                </ul>
            </nav>
        </div>
    )
};

export default Header;