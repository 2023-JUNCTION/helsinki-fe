/* eslint-disable */

import React, {useEffect, useState} from 'react';
import Character from '~/components/Character';
import styles from './Detail.module.scss';
import MissionBox from "~/components/MissionBox";
import Count from "~/components/Count";
import {useDeviceMotion} from "~/hooks";

const Mission = () => {
  const [isMission, setIsMission] = useState("");
  const { step, jumpingJackCount, startMotion } = useDeviceMotion();

  useEffect(() => {
    // @ts-ignore
    if (isMission === true) {
      startMotion();
    }
  }, [isMission]);

  useEffect(() => {
    if (step > 100) {
      setIsMission("WALK");
    }
  }, []);

  const getCount = () => {
    if (isMission === "WALK") {
      return step;
    }

    if (isMission === "JUMPING") {
      return jumpingJackCount;
    }

    return null
  }

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
      <div className={styles.content}>
        <Count value={getCount()}/>
        <Character type={getType()} />
      </div>
      <MissionBox isMission={isMission} setIsMission={setIsMission}  />
    </div>
  );
};

export default Mission;
