import cn from 'classnames';
import { Button } from './common';

import styles from './MissionBox.module.scss';

type Props = {
  isMission: string;
  setIsMission: (isActive: string) => void;
};

const MissionBox = ({ isMission, setIsMission }: Props) => {
  const startMission = (missionName: string) => {
    setIsMission(missionName);

    setTimeout(() => {
      setIsMission(''); // 미션 상태 끝
    }, 10000);
  };

  return !isMission ? (
    <div className={cn(styles.container, !isMission && styles.is_show)}>
      <div className={styles.title}>Complete a mission from your bf and get rid off all the teasing</div>
      <div className={styles.button_group}>
        <Button
          labelText="Walk 10 steps"
          onClick={() => {
            startMission('WALK');
          }}
        />
        <Button
          labelText="Do five jumping jacks"
          onClick={() => {
            startMission('JUMPING');
          }}
        />
      </div>
    </div>
  ) : (
    <div className={cn(styles.container2, isMission && styles.is_show)}>
      <p className={styles.title}>On a mission...</p>
      <div className={styles.button_group}>
        {isMission === 'WALK' && (
          <Button
            labelText="Walk 10 steps"
            onClick={() => {
              startMission('WALK');
            }}
          />
        )}
        {isMission === 'JUMPING' && (
          <Button
            labelText="Do five jumping jacks"
            onClick={() => {
              startMission('JUMPING');
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MissionBox;
