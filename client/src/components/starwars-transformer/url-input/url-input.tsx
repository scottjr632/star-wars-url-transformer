import React, { useState, FC, useEffect, useCallback } from 'react';

import { NeoMorphismInput } from '../../inputs/neomorp-input';
import { NeoMorphButton } from '../../buttons/neomorph-button';
import { validateURL } from '../../../common/utils';
import { StarWarsError } from '../error';

const MIN_VALID_URL = 7;

interface Props {
  getURL: (value: string) => Promise<{ url: string }>
}

const UrlInput: FC<Props> = ({ getURL }) => {
  const [value, setValue] = useState('');
  // const [isValidURL, setIsValidURL] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>('');

  useEffect(() => {
    if (!validateURL(value) && value.length > MIN_VALID_URL) {
      setErrorMessage('URL is invalid')
    } else {
      setErrorMessage(null);
    }
  }, [value]);

  const handleGetURL = useCallback(() => {
    if (!errorMessage && value.length > MIN_VALID_URL) {
      getURL(value)
    } else if (!errorMessage) {
      setErrorMessage(`URL needs to be at least ${MIN_VALID_URL} characters`)
    }
  }, [getURL, value, errorMessage])

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
      <NeoMorphButton onClick={handleGetURL}>Submit</NeoMorphButton>
      {!!errorMessage &&
      <StarWarsError>
        {errorMessage}
      </StarWarsError>}
    </>
  );
};

export default UrlInput;