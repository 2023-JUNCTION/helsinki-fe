/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable */
import React, {useEffect, useRef, useState} from 'react';
import {useDraggable} from 'react-use-draggable-scroll';
import CanvasImageSequence from 'react-canvas-image-sequence';
import Character, { hazelState, jennyState, hazelIsBad, jennyIsBad } from '~/components/Character';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai'

import styles from './Map.module.scss';
import Modal from '~/components/common/Modal';
import { Button } from '~/components';


export const JENNY = ['jenny_laying_down', 'jenny_sit_up', 'jenny_stand_up', 'jenny_walking'];
export const HAZEL = ['hazel_jumping_jacks', 'hazel_texting', 'hazel_walking'];

const npcCoordinateDelta = {
  holden: { x: 320, y: 100 },
  ray: { x: 180, y: -140 },
  jenny: { x: -150, y: -260 },
  hazel: { x: 80, y: 200 },
  daniel: { x: -260, y: 110 }
}

const move = (target: HTMLElement, x: number, y: number) => {
  target.style.left = x + 'px';
  target.style.top = y + 'px';
}

const moveMe = () => {
  const container = document.getElementById('container');
  const me = document.getElementById('me');

  if (container === null || me === null) {
    return;
  }

  const {x: meX, y: meY} = getMeXY(me, container)

  // me 를 map 중앙으로 스크롤
  move(me, meX, meY);
}

const moveNpc = () => {
  const container = document.getElementById('container');
  const me = document.getElementById('me');

  if (container === null || me === null) {
    return;
  }

  const {x: meX, y: meY} = getMeXY(me, container)

  Object.entries(npcCoordinateDelta).forEach(([key, value]) => {
    const opponent = document.getElementById(key);

    if (opponent === null) {
      return;
    }

    const {x: opponentDeltaX, y: opponentDeltaY} = value;

    move(opponent, meX + opponentDeltaX, meY + opponentDeltaY);
  });
}

const getMeXY = (me: HTMLElement, container: HTMLElement) => {
  const containerRect = container.getBoundingClientRect();
  const meRect = me.getBoundingClientRect();

  const x = (containerRect.width - meRect.width) / 2;
  const y = (containerRect.height - meRect.height) / 2;

  return {x, y}
}


const getDistance = (me: Coordinate, opponent: Coordinate) => {
  const x = me.latitude - opponent.latitude;
  const y = me.longitude - opponent.longitude;

  return Math.sqrt(x * x + y * y);
}

const Map = () => {
  const navigate = useNavigate();

  const ref = useRef<any>(null);
  const { events } = useDraggable(ref, {
    applyRubberBandEffect: true,
    decayRate: 0.96,
  });


  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    ref.current.scrollTo(
      (imageRef.current!.getBoundingClientRect().width - ref.current!.getBoundingClientRect().width) / 2,
      (imageRef.current!.getBoundingClientRect().height - ref.current!.getBoundingClientRect().height) / 2,
    );
  }, []);

  useEffect(() => {
    moveMe()
    moveNpc()
  }, []);

  const onClick = (nickName?: string) => {
    navigate({
      pathname: '/detail',
      search: nickName ? `?nickname=${nickName}` : '',
    });  
  }

  const jennyStep = useAtomValue(jennyState);
  const hazelStep = useAtomValue(hazelState);
  const jennyBad = useAtomValue(jennyIsBad);
  const hazelBad = useAtomValue(hazelIsBad);

  
  return (
    <div className={styles.container}>
      <div className={styles.title}>Feed</div>
      <div className={styles.map} {...events} ref={ref}>
        <img className={styles.image} src="/map.png" alt="cat" ref={imageRef}  id="container"/>
        <button className={styles.user} id="me" onClick={() => onClick('me_standing')}>
          <Character isNickname type="me_standing" />
        </button>
        <button className={styles.user} id="holden" onClick={() => onClick('holden_sitting')}>
          <Character isNickname type="holden_sitting" />
        </button>
        <button className={styles.user} id="ray" onClick={() => onClick('lay_walking')}>
          <Character isNickname type="lay_walking" />
        </button>
        <button className={styles.user} id="hazel" onClick={() => onClick(HAZEL[hazelStep])}>
          <Character isBad isNickname type={HAZEL[hazelStep]} isTeaseTag={hazelBad ?? false}/>
        </button>
        <button className={styles.user} id="daniel" onClick={() => onClick('daniel_dance')}>
          <Character isNickname type="daniel_dance" />
        </button>
        <button className={styles.user} id="jenny"  onClick={() => onClick(JENNY[jennyStep])}>
          <Character isBad isNickname type={JENNY[jennyStep]} isTeaseTag={jennyBad ?? false}/>
        </button>
      </div>
    </div>
  );
};

export default Map;
