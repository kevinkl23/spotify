import React from 'react';

function SearchBar({ searchArtists, setSearch }) {
  return (
    <form onSubmit={searchArtists} className='search-form'>
      <input type='text' placeholder='Search Songs' onChange={e => setSearch(e.target.value)}></input>
      <button type='submit'>Search</button>
    </form>
  );
}

export default SearchBar;