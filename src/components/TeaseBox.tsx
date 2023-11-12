import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Button } from './common';

import styles from './TeaseBox.module.scss';

const TeaseBox = () => {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsActive(true));
  }, []);

  const onClick = () => setIsActive(false);

  return (
    <div className={cn(styles.container, isActive && styles.is_show)}>
      <div className={styles.title}>Tease!</div>
      <div className={styles.tease_button}>
        <button type="button" onClick={onClick}>
          <img className={styles.icon} src="/tease1.png" alt="tease1" />
        </button>
        <button type="button" onClick={onClick}>
          <img className={styles.icon} src="/tease2.png" alt="tease2" />
        </button>
        <button type="button" onClick={onClick}>
          <img className={styles.icon} src="/tease3.png" alt="tease3" />
        </button>
        <button type="button" onClick={onClick}>
          <img className={styles.icon} src="/tease3.png" alt="tease3" />
        </button>
      </div>
      <div className={styles.title}>Give Jenny a mission to move!</div>

      <div className={styles.button_group}>
        <Button isBlack labelText="Walk 12 minutes" />
        <Button isBlack labelText="Do ten jumping jacks" />
        <Button isBlack labelText="Type to give a mission" disabled />
      </div>
    </div>
  );
};

export default TeaseBox;
