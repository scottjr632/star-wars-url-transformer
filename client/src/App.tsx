import React from 'react';

import StarWars from './components/svgs/star-wars'
import { ReactComponent as GitHubSVG } from './res/github.svg'
import { NeoMorphPanel } from './components/panels/neomorph-pannel'
import { NeoMorphismInput } from './components/inputs/neomorp-input'
import { NeoMorphButton } from './components/buttons/neomorph-button'

import './app.scss'    

function App() {
  return (
    <div className='app__container'>
      <div className="app__main">
        <div>
          <div>
            <StarWars />
            <h2>Star Wars URL Transformer</h2>
          </div>
          <div className="app__input-container">
            <div className='app__input-container--info'>
              <h4>Enter url</h4>
              <p>Urls are probabilistically unique and permanent</p>
            </div>
            <NeoMorphismInput placeholder={'https://google.com'} />
            <NeoMorphButton>Submit</NeoMorphButton>
          </div>
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
          <NeoMorphPanel>
            <h2>Popular</h2>
          </NeoMorphPanel>
        </div>
      </div>
    </div>
  );
}

export default App;
