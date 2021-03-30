import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const NominationList = ({ nomination, handleRemove }) => {
  return (
    <div>
      <h2>Your Nominations</h2>
      <ul>
        {nomination.map(list => (
          <li key={list.imdbID}>{list.Title}<span className="remove-position"><FontAwesomeIcon icon={faTrashAlt} onClick={() => handleRemove(list)}/></span></li>
        ))}
      </ul>
    </div>
  )
}

export default NominationList;
