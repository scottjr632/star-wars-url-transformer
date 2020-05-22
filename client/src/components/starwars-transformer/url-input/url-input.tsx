import React, { useState, FC } from 'react';

import { NeoMorphismInput } from '../../inputs/neomorp-input';
import { NeoMorphButton } from '../../buttons/neomorph-button';

interface Props {
  getURL: (value: string) => Promise<{ url: string }>
}

const UrlInput: FC<Props> = ({ getURL }) => {
  const [value, setValue] = useState('');

  return (
    <>
      <div className='app__input-container--info'>
        <h4>Enter url</h4>
        <p>Urls are probabilistically unique and permanent</p>
      </div>
      <NeoMorphismInput
        value={value}
        autoFocus={true}
        onChange={e => setValue(e.currentTarget.value)}
        placeholder={'https://google.com'}
      />
      <NeoMorphButton onClick={() => getURL(value)}>Submit</NeoMorphButton>
    </>
  );
};

export default UrlInput;