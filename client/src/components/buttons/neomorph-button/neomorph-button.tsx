import React, { forwardRef } from 'react'

import styles from './button.module.scss'

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const NeoMorphButton = 
  forwardRef<HTMLButtonElement, Props>((props, ref) => {
  return (
    <button
      className={styles.neoButton}
      ref={ref}
      {...props}
    >
      {props.children}
    </button>
  )
})

export default NeoMorphButton