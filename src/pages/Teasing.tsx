import React from 'react';
// import { Button } from '~/components';
// import TeaseBox from '~/components/TeaseBox';
import TeaseAttackBox from '~/components/TeaseAttackBox';

import Character from '~/components/Character';
import styles from './Teasing.module.scss';

const Teasing = () => {
  return (
    <div className={styles.container}>
      <button className={styles.back_button} type="button" onClick={() => console.log()}>
        <img src="/back_button.png" alt="back_button" />
      </button>
      {/* <Button labelText="asdfsdf" /> */}
      {/* <TeaseBox /> */}
      <Character />
      <TeaseAttackBox />
    </div>
  );
};

export default Teasing;
