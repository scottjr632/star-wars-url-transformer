import React, { useEffect, useState, FC, CSSProperties } from 'react';

import styles from './url.module.scss';
import { NeoMorphButton } from '../../buttons/neomorph-button';

interface Props {
  subdomain: string

  goBack?: () => any

  showInfo?: boolean

  style?: CSSProperties
  linkStyle?: CSSProperties
}

const URL: FC<Props> = ({ subdomain, style, linkStyle, goBack, showInfo = true }) => {
  const [fullUrl, setFullUrl] = useState('');

  useEffect(() => {
    const { host, protocol } = window.location;

    setFullUrl(`${protocol}//${subdomain}.${host}`);
  }, [subdomain]);

  return (
    <div className={styles.url} style={style}>
      <h3>
        {fullUrl.length > 0 &&
          <a href={fullUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>{fullUrl}</a>
        }
      </h3>
      {showInfo &&
        <>
          <p>Feel free to share this link with whomever. The chances of this link changing are small, however, you should not use this link permanently for important sites.</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <NeoMorphButton onClick={goBack}>Try Another URL</NeoMorphButton>
          </div>
        </>
      }
    </div>
  );
};

export default URL;