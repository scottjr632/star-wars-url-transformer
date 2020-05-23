import React from 'react';

import StarWars from './components/svgs/star-wars';
import { ReactComponent as GitHubSVG } from './res/github.svg';

import { UserURLs } from './components/starwars-transformer/user-urls';
import StarWarsInput from './components/starwars-transformer/star-wars-input';

import './app.scss';

function App() {
  return (
    <div className='app__container'>
      <div className="app__main">
        <div>
          <div>
            <StarWars />
            <h2>Star Wars URL Transformer</h2>
          </div>
          <StarWarsInput />
          <h4 className={'app__action-info'}>
            <div>
              Check out the project on
            </div>
            <a
              href='https://github.com/scottjr632'
              target='_blank'
              className={'app__action-info--svg_container'}
              rel='noopener noreferrer'
            >
              <GitHubSVG />
            </a>
          </h4>
        </div>
        <div className={'app__right-container'}>
          <UserURLs />
        </div>
      </div>
    </div>
  );
}

export default App;
