import React, { FC, useEffect } from 'react';

import styles from './error.module.scss';

interface Props {
  errorMessage: any
}

const StarWarsError: FC<Props> = ({ children, errorMessage }) => {
  useEffect(() => {
    console.error({ errorMessage });
  });

  return (
    <div className={styles.starWarsError}>
      <p>
        {children}
      </p>
    </div>
  );
};

export default StarWarsError;