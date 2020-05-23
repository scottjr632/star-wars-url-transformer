import React, { CSSProperties } from 'react';

import { NeoMorphPanel } from '../../panels/neomorph-pannel';
import { useUserURLs } from '../../../common/hooks/useUserURLs';
import { StarWarsURL } from '../url';

const headerStyles: CSSProperties = {
  color: '#c8b5ac',
  position: 'sticky',
  top: 0,
  backgroundColor: '#404852',
};

const UserURLs = () => {
  const urls = useUserURLs();

  return (
    <NeoMorphPanel>
      <h2 style={headerStyles}>Your Recent URLs</h2>
      {urls.map((url, idx) => (
        <StarWarsURL
          key={url}
          subdomain={url}
          showInfo={false}
          style={{ fontSize: '0.85rem', width: '95%', margin: 'auto' }}
          linkStyle={{ color: idx % 2 === 0 ? '#fc6681' : '#8499f0' }}
        />
      ))}
    </NeoMorphPanel>
  );
};

export default UserURLs;