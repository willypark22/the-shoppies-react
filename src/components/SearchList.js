import React from 'react';
import uuid from 'react-uuid';
import NominateButton from '../components/NominateButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import noPhoto from '../images/noPhoto.jpg';

const SearchList = ({ movieName, handleAdd, query, movieCounter, nomination }) => {

  if(movieName !== undefined) {
    let uniqueMovieNames = movieName.filter( (ele, ind) => ind === movieName.findIndex( elem => elem.imdbID === ele.imdbID && elem.Title === ele.Title));

    return (
      <div>
        <div className="movie-results-header">
            <p><span><FontAwesomeIcon icon={faFolderOpen} style={{marginRight: '10px'}}/></span>Search results for "{query}"</p>
        </div>
        <div className="movie-poster-container">
          {
            uniqueMovieNames.map(names => (
              <div key={uuid()} className="movie">
                <div className="movie-poster-size">
                  <img src={(names.Poster === "N/A") ? noPhoto : names.Poster} alt={names.Title} style={{maxHeight: "300px"}}></img>
                </div>
                <div className="movie-title-size">
                  <p>{names.Title}</p>
                  <p>({names.Year})</p>
                </div>
                <NominateButton 
                  movieCounter={movieCounter}
                  handleAdd={handleAdd}
                  names={names}
                  nomination={nomination}
                />
              </div>
            ))
          }
        </div>
      </div>
    )
  }
  else {
    return(
      <div className="movie-results-header">
        <p>Results didn't return anything... <span><FontAwesomeIcon icon={faFrown}/></span></p>
      </div>
    )
  }
}

export default SearchList;
