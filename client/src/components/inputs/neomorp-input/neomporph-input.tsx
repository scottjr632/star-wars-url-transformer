import React, { forwardRef } from 'react';

import styles from './input.module.scss';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const NeoMorphismInput =
  forwardRef<HTMLInputElement, Props>((props, ref) => {

    return (
      <input
        className={styles.neoInput}
        ref={ref}
        {...props}
      />
    );
  });

export default NeoMorphismInput;