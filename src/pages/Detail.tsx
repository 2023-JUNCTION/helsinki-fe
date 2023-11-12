import React from 'react';
import cn from 'classnames';
// import { Button } from '~/components';
// import TeaseBox from '~/components/TeaseBox';
import TeaseAttackBox from '~/components/TeaseAttackBox';

import Character from '~/components/Character';

import { Button } from '~/components';
import styles from './Detail.module.scss';

type Props = {
  isTeasing?: boolean;
};

const Detail = ({ isTeasing = true }: Props) => {
  const nickName = 'lay';
  return (
    <div className={cn(styles.container, isTeasing && styles.teasing)}>
      <button className={styles.back_button} type="button" onClick={() => console.log()}>
        <img src="/back_button.png" alt="back_button" />
      </button>
      <button className={styles.message_button} type="button" onClick={() => console.log()}>
        <img src="/message.png" alt="back_button" />
      </button>
      <div className={styles.nickname}>{nickName}</div>
      <div className={styles.working}>
        is <b>Dancing</b> <br />
        for 10 min
      </div>
      <div className={styles.character}>
        <Character />
      </div>
      {isTeasing ? (
        <>
          <div className={styles.guage}>
            <img src="/guage.png" alt="guage" width="60%" />
          </div>
          <TeaseAttackBox />
          <div className={styles.button_group}>
            <Button isBlack labelText="Let's tease" />
            <Button isBlack labelText="Suggest going out!" />
          </div>
        </>
      ) : (
        <div className={styles.movement}>
          <div className={styles.title}>Today’s movement</div>
          <div className={styles.box}>
            <div className={styles.each}>
              <img src="/movement1.png" alt="movement1" />
              <div>
                3006 <b>step</b>
              </div>
            </div>
            <div className={styles.each}>
              <img src="/movement2.png" alt="movement2" />
              <div>
                76 <b>beat</b>
              </div>
            </div>
            <div className={styles.each}>
              <img src="/movement3.png" alt="movement3" />
              <div>5h 30m</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
