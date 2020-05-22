import React, { useEffect, useState, FC } from 'react';

import styles from './url.module.scss';

interface Props {
  subdomain: string
}

const URL: FC<Props> = ({ subdomain }) => {
  const [fullUrl, setFullUrl] = useState('');

  useEffect(() => {
    const { host, protocol } = window.location;

    setFullUrl(`${protocol}//${subdomain}.${host}`);
  }, [subdomain]);

  return (
    <div className={styles.url}>
      <h3>
        {fullUrl.length > 0 &&
          <a href={fullUrl} target="_blank" rel="noopener noreferrer">{fullUrl}</a>
        }
      </h3>
      <p>Feel free to share this link with whomever. The chances of this link changing are small, however, you should not use this link permanently for important sites.</p>
    </div>
  );
};

export default URL;