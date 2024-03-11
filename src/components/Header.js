import React from 'react';
import '../index.css';
import { link } from '../util/Spotify';

function Header({ token, logOut }) {
    return (
        <div className='header'>
            <h1>Spotify</h1>
            {!token ? 
                <button className='header-button'><a href={link}>Log In</a></button>
                :
            <button className='header-button' onClick={logOut}>Log Out</button>
      }
        </div>
    );
}

export default Header;