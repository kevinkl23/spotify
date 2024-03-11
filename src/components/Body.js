import React from 'react';
import SearchBar from '../components/SearchBar';
import { render } from '@testing-library/react';

function Body({ token, search, searchArtists,  setSearch, renderSongs }) {
    return (
        <div>
            {token ?
                <SearchBar searchArtists={searchArtists} setSearch={setSearch} /> :
            <h2>Please Log In</h2>
            }

            {renderSongs()}
        </div>
    );  
}

export default Body;