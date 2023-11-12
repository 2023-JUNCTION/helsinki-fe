/* eslint-disable */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './Count.module.scss';

const Count = () => {
  const [value, setValue] = useState(0)

  return (
      <div className={cn(styles.container)}>
        <p className={cn(styles.font)}>{value}</p>
      </div>
  );
};

export default Count;
