/* eslint-disable */

import React, { useEffect, useState } from 'react';
import Character from '~/components/Character';
import styles from './Detail.module.scss';
import MissionBox from '~/components/MissionBox';
import Count from '~/components/Count';
import { useConfetti, useDeviceMotion } from '~/hooks';
import { useNavigate } from 'react-router-dom';
import { Button } from '~/components';
import Modal from '~/components/common/Modal';

const Mission = () => {
  const [isMission, setIsMission] = useState('');
  const { yg, step, jumpingJackCount, startMotion, isDeviceMotionGranted } = useDeviceMotion();
  const [done, setDone] = useState(false);
  const { popEmoji } = useConfetti();

  const navigate = useNavigate();

  useEffect(() => {
    // @ts-ignore
    if (isMission === true) {
      startMotion();
    }
  }, [isMission]);

  useEffect(() => {
    if (step >= 10) {
      setDone(true);
    }

    if (jumpingJackCount >= 5) {
      setDone(true);
    }
  }, [step, jumpingJackCount]);

  
  const getCount = () => {
    if (isMission === 'WALK') {
      return step;
    }

    if (isMission === 'JUMPING') {
      return jumpingJackCount;
    }

    return null;
  };

  const getType = () => {
    if (isMission === 'WALK') {
      return 'me_walking';
    }

    if (isMission === 'JUMPING') {
      return 'me_jumping_jacks';
    }

    return 'me_standing';
  };

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (done) {
      popEmoji();
      setInterval(() => popEmoji(), 500);
    }
  }, [done]);
  return (
    <div className={styles.container}>
      <button className={styles.back_button} type="button">
        <img src="/back_button.png" alt="back_button" />
      </button>
      <div className={styles.content}>
        <Count value={jumpingJackCount} />
        <Character type={getType()} />
      </div>
      <Modal isOpen={isOpen && !isDeviceMotionGranted}>
        <div className={styles.modal_title}>
          Get User Location,
          <br />
          Motion Data
        </div>
        <Button
          type="button"
          onClick={async () => {
            await startMotion();
            setIsOpen(false);
          }}
        >
          Agree
        </Button>
      </Modal>
      <Modal isOpen={done}>
        <div className={styles.modal_title}>Congratulation!</div>
        <Button
          labelText="OK"
          onClick={() => {
            popEmoji();
            setTimeout(() => {
              navigate('/');
            }, 3000);
          }}
        />
      </Modal>
      <MissionBox isMission={isMission} setIsMission={setIsMission} />
    </div>
  );
};

export default Mission;
