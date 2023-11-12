/* eslint-disable */

import React, {useState} from 'react';
import Character from '~/components/Character';
import styles from './Detail.module.scss';
import MissionBox from "~/components/MissionBox";
import Count from "~/components/Count";
import {useDeviceMotion} from "~/hooks";

const Mission = () => {
  const [isMission, setIsMission] = useState("");
  const { step, jumpingJackCount, onClick } = useDeviceMotion();

  const getType = () => {
    if (isMission === "WALK") {
      return "me_walking";
    }

    if (isMission === "JUMPING") {
      return "me_jumping_jacks";
    }

    return "me_standing";
  }

  return (
    <div className={styles.container}>
      <button className={styles.back_button} type="button">
        <img src="/back_button.png" alt="back_button" />
      </button>
      <div>
        <Count />
        <Character type={getType()} />
      </div>
      <MissionBox isMission={isMission} setIsActive={setIsMission} />
    </div>
  );
};

export default Mission;
