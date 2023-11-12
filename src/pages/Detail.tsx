import React, { useState } from 'react';
import cn from 'classnames';
// import { Button } from '~/components';
// import TeaseBox from '~/components/TeaseBox';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import Character, { hazelIsBad, jennyIsBad } from '~/components/Character';
import { Button } from '~/components';
import Modal from '~/components/common/Modal';

import TeaseBox from '~/components/TeaseBox';
import styles from './Detail.module.scss';

const teasingStatue = ['jenny_laying_down', 'hazel_jumping_jacks', 'hazel_texting'];

const Detail = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const status = new URLSearchParams(search).get('nickname');
  const nickName = status?.split('_')[0];

  const onClick = () => navigate(-1);

  const [isOpen, setIsOpen] = useState(false);

  const isTeasing = teasingStatue.some(item => status === item);

  // const isMe = nickName === 'me';
  const [jennyBad, setJennyIsBad] = useAtom(jennyIsBad);
  const [hazelBad, setHazleIsBad] = useAtom(hazelIsBad);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClickEmoji = (isTeass: boolean = false) => {
    if (!isTeass) {
      setIsModalOpen(true);
    } else {
      setIsOpen(true);
    }

    if (nickName === 'hazel') {
      setHazleIsBad(true);
    }

    if (nickName === 'jenny') {
      setJennyIsBad(true);
    }
  };

  return (
    <div className={cn(styles.container, isTeasing && styles.teasing)}>
      <Modal isOpen={isOpen}>
        <div>
          <div className={styles.modal_title}>Mission has been sent!</div>
          <Button onClick={() => setIsOpen(false)}>OK</Button>
        </div>
      </Modal>
      <button className={styles.back_button} type="button" onClick={onClick}>
        <img src="/back_button.png" alt="back_button" />
      </button>
      <button className={styles.message_button} type="button" onClick={onClick}>
        <img src="/message.png" alt="back_button" />
      </button>
      <div className={cn(styles.nickname, isTeasing && styles.teasing)}>{nickName}</div>
      <div className={cn(styles.working, isTeasing && styles.teasing)}>
        is <b>{status?.split('_')[1]}</b> <br />
        for 10 min
      </div>
      <div className={styles.character}>
        <Character
          type={status as string}
          isTeaseTag={(nickName === 'hazel' && hazelBad) || (nickName === 'jenny' && jennyBad)}
        />
      </div>
      {isTeasing ? (
        <>
          <div className={styles.guage}>
            <img src="/guage.png" alt="guage" width="60%" />
          </div>
          <div className={styles.button_group}>
            <Button isBlack labelText="Let's tease" onClick={() => setIsDrawerOpen(true)} />
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
      <Modal isOpen={isModalOpen}>
        <div className={styles.modal_title}>Mission has been sent!</div>
        <Button labelText="OK" onClick={() => navigate(-1)} />
      </Modal>
      <TeaseBox isOpen={isDrawerOpen} onClick={handleClickEmoji} />
    </div>
  );
};

export default Detail;
