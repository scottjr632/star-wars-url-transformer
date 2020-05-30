import React, { useState, useEffect, useCallback } from 'react';
import { useMutation, MutationResult } from 'react-query';

import { Loading } from '../../components/spinners/loading';
import { getTransformedUrl, TransformedUrlResponse } from '../../common/api/mutations';

import { StarWarsError } from './error';
import { URLInput } from './url-input';
import { StarWarsURL } from './url';

interface Props {
  getURL: (value: string) => any
}

type Pages = 'input' | 'success' | 'error' | 'loading'

const SwitchOnMutationResult = ({ data, error, status, getURL }:
  MutationResult<TransformedUrlResponse> & Props) => {
  const [currPage, setCurrPage] = useState<Pages>('loading');

  useEffect(() => {
    switch (true) {
      case !!error:
        setCurrPage('error')
        break;
      case status === 'idle':
        setCurrPage('input');
        break;
      case status === 'success' && !!data:
        setCurrPage('success');
        break;
      default:
        break;
    }
  }, [data, error, status])

  const handleGetURL = useCallback((value: string) => {
    setCurrPage('loading');
    return getURL(value);
  }, [getURL])

  switch (true) {
    case currPage === 'error':
      return (
        <>
          <URLInput getURL={handleGetURL} />
          <StarWarsError errorMessage={error}>
            Something went wrong. Please try again.
        </StarWarsError>
        </>
      );
    case currPage === 'input':
      return <URLInput getURL={handleGetURL} />;
    case currPage === 'success':
      return <StarWarsURL subdomain={data!.url} goBack={() => setCurrPage('input')} />;
    default:
      return <Loading />;
  }

};

const StarWarsInput = () => {
  const [getURL, results] = useMutation(getTransformedUrl);
  return (
    <div className="app__input-container">
      <SwitchOnMutationResult getURL={getURL} {...results} />
    </div>
  );
};

export default StarWarsInput;