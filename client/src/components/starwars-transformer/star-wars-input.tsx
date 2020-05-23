import React from 'react';
import { useMutation, MutationResult } from 'react-query';

import { Loading } from '../../components/spinners/loading';
import { getTransformedUrl, TransformedUrlResponse } from '../../common/api/mutations';

import { StarWarsError } from './error';
import { URLInput } from './url-input';
import { StarWarsURL } from './url';

interface Props {
  getURL: (value: string) => any
}

const SwitchOnMutationResult = ({ data, error, status, getURL }:
MutationResult<TransformedUrlResponse> & Props) => {

  switch (true) {
  case !!error:
    return (
      <>
        <URLInput getURL={getURL} />
        <StarWarsError errorMessage={error}>
            Something went wrong. Please try again.
        </StarWarsError>
      </>
    );
  case status === 'success' && !!data:
    return <StarWarsURL subdomain={data!.url} />;
  case status === 'idle':
    return <URLInput getURL={getURL} />;
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