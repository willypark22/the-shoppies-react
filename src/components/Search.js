import React, { useState, useEffect } from 'react';
import SearchList from '../components/SearchList';
import NominationList from '../components/NominationList';
import logo from '../images/shoppies.png';

const Search = () => {
  const api = {
    key: "5986669d",
    baseName: "https://www.omdbapi.com/?s=",
    baseId: "https://www.omdbapi.com/?i="
  }

  const [query, setQuery] = useState('');
  const [movieName, setMovieName] = useState([]);
  const [nomination, setNomination] = useState([]);
  const [movieCounter, setMovieCounter] = useState(0);
  // const [buttonDisable, setButtonDisable] = useState(false);

  //Run once when the app starts
  useEffect(() => {
    // getLocalNominations();
  }, []);

  //Use effect every time something happens
  useEffect(() => {
    saveLocalNominations();
  }, [nomination, movieCounter]);

  const fetchMovies = evt => {
    if(evt.key === "Enter") {
      fetch(`${api.baseName}${query}&apikey=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setMovieName(result.Search);
      });
    }
  }

  const nominateMovie = movie => {
    if(movieCounter === 5) {
      console.log("reached the limit");
    }
    else {
      setMovieCounter(movieCounter + 1);
      setNomination(prevState => [...prevState, movie]);
      // setButtonDisable(true);
    }
  }

  const removeMovie = (movie) => {
    setNomination(nomination.filter(item => item.imdbID !== movie.imdbID));
    setMovieCounter(movieCounter - 1);
  }

  //Save to local
  const saveLocalNominations = () => {
    localStorage.setItem("nomination", JSON.stringify(nomination));
    localStorage.setItem("movieCounter", JSON.stringify(movieCounter));
  }

  const getLocalNominations = () => {
    if((localStorage.getItem("nomination") === null) && (localStorage.getItem("movieCounter") === null)) {
      localStorage.setItem("nomination");
      localStorage.setItem("movieCounter");
    }
    else {
      let nominationLocal = JSON.parse(localStorage.getItem("nomination"));
      let counterLocal = JSON.parse(localStorage.getItem("movieCounter"));
      setNomination(nominationLocal);
      setMovieCounter(counterLocal);
    }
  }

  return (
    <div>
      <div className="nav-bar">
        <img src={logo} alt="" width="120px"></img>
        <input
          type="text"
          className="search-bar"
          placeholder="Search movie..."
          onKeyPress={fetchMovies}
          onChange={e => setQuery(e.target.value)}
          value={query}
        />
      </div>
      <div className="movie-result-row">
        <div className="movie-result-column-70">
          <SearchList
            movieName={movieName}
            handleAdd={nominateMovie}
            query={query}
            movieCounter={movieCounter}
            nomination={nomination}
          />
        </div>
        <div className="movie-result-column-30">
          <NominationList 
            nomination={nomination}
            handleRemove={removeMovie}
          />
        </div>
      </div>
    </div>
  )
}

export default Search;
