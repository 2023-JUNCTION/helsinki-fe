import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Button } from './common';

import styles from './TeaseAttackBox.module.scss';

const TeaseAttackBox = () => {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsActive(true));
  }, []);

  const onClick = () => setIsActive(false);

  return (
    <div className={cn(styles.container, isActive && styles.is_show)}>
      <div className={styles.title}>Complete a mission from your bf and get rid off all the teasing</div>
      <div className={styles.button_group}>
        <Button labelText="Walk 12 minutes" onClick={onClick} />
        <Button labelText="Do ten jumping jacks" onClick={onClick} />
      </div>
    </div>
  );
};

export default TeaseAttackBox;
