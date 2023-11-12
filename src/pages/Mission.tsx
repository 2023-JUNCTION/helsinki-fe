/* eslint-disable */

import React from 'react';
import Character from '~/components/Character';
import MissionBox from '~/components/MissionBox';
import styles from './Teasing.module.scss';
import TeaseAttackBox from "~/components/TeaseAttackBox";

const Mission = () => {
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

export default Mission;
