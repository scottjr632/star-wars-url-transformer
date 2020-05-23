import React, { FC } from 'react';

import styles from './panel.module.scss';

const NeoMorphPanel: FC = ({ children }) => {
  return (
    <div className={styles.panel}>
      {children}
    </div>
  );
};

export default NeoMorphPanel;