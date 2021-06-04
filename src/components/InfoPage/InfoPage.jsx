import React from 'react';


// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function InfoPage() {
  return (
    <div className="container">
      <div>
        <p>Information about this project</p>
        <ul>
          <li>
              React
          </li>
          <li>
              React Redux
          </li>
          <li>
              Material UI
          </li>
          <li>
              Node.js
          </li>
          <li>
              PostgreSQL
          </li>
          <li>
              Express
          </li>
          <li>
              And more!
          </li>
        </ul>
      </div>
    </div>
  );
}

export default InfoPage;
