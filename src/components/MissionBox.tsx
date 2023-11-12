import cn from 'classnames';
import { Button } from './common';

import styles from './MissionBox.module.scss';

type Props = {
  isMission: string;
  setIsActive: (isActive: string) => void;
};

const MissionBox = ({ isMission, setIsActive }: Props) => {
  const startMission = (missionName: string) => {
    setIsActive(missionName);

    setTimeout(() => {
      setIsActive(''); // 미션 상태 끝
    }, 10000);
  };

  return (
    <div className={cn(styles.container, !isMission && styles.is_show)}>
      <div className={styles.title}>Complete a mission from your bf and get rid off all the teasing</div>
      <div className={styles.button_group}>
        <Button
          labelText="Walk 12 minutes"
          onClick={() => {
            startMission('WALK');
          }}
        />
        <Button
          labelText="Do ten jumping jacks"
          onClick={() => {
            startMission('JUMPING');
          }}
        />
      </div>
    </div>
  );
};

export default MissionBox;
