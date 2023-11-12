/* eslint-disable */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './Count.module.scss';

type Props = {
  value: number | null;
}

const Count = ({value} : Props) => {
  if (value == null) {
    return null
  }


  return (
      <div className={cn(styles.container)}>
        <p className={cn(styles.font)}>{value}</p>
      </div>
  );
};

export default Count;
