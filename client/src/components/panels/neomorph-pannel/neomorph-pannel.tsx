import React, { FC, useEffect } from 'react';

import styles from './panel.module.scss';
import { useUserURLs } from '../../../common/hooks/useUserURLs';

const NeoMorphPanel: FC = ({ children }) => {
  return (
    <div className={styles.panel}>
      {children}
    </div>
  );
};

export default NeoMorphPanel;