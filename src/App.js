import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Body from './components/Body';

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

  const renderSongs = () => {
    return songs.map(song => {
      return(
        <div key={song.id} className='song-container'>
          <div className='song-info'>
            <p className='song-name'>{song.name}</p>
            <p className='artist-name'>{song.artists[0].name}</p>
          </div>
          <button className='add-button'>+</button>
        </div>
      );
    });
  }

  return (
    <div className="App">
      <Header token={token} logOut={logout}/>

      <Body token={token} search={search} searchArtists={searchArtists} setSearch={setSearch} renderSongs={renderSongs}/>
    </div>
  );
}

export default App;
