import logo from './logo.svg';
import './App.css';
import { link } from './util/Spotify';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import SearchBar from './components/SearchBar';

function App() {

  const [token, setToken] = useState('');
  const [search, setSearch] = useState('');
  const [songs, setSongs] = useState([]);

  useEffect(() => {
      const hash = window.location.hash
      let token = window.localStorage.getItem('token')

      if(!token && hash) {
        token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1]
        
        window.location.hash = ''
        window.localStorage.setItem('token', token)
      }
      setToken(token);
  }, [])

  const logout = () => {
    setToken('');
    window.localStorage.removeItem('token');
  }

  const searchArtists = async (e) =>{
    e.preventDefault();
    const {data} = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: search,
        type: 'track'
      }
    });

    // console.log(data);

    setSongs(data.tracks.items)
    // console.log(songs);
  }

  const renderArtists = () => {
    return songs.map(song => {
      return(
        <div key={song.id}>
          <p>{song.name}</p>
          <p>{song.artists[0].name}</p>
        </div>
      );
    });
  }

  return (
    <div className="App">
      {!token ? 
        <a href={link}>Log In</a> :
        <button onClick={logout}>Log Out</button>
      }


      {token ?
        <SearchBar searchArtists={searchArtists} setSearch={setSearch} /> :
        <h2>Please Log In</h2>
      }

      {renderArtists()}
    </div>
  );
}

export default App;
