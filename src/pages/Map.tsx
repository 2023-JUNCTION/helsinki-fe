/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable */
import React, {useEffect, useRef} from 'react';
import {useDraggable} from 'react-use-draggable-scroll';
import CanvasImageSequence from 'react-canvas-image-sequence';

import styles from './Map.module.scss';

const IMAGES = Array.from({ length: 30 }, (_v, i) => `Red hair Waking00${String(i + 1).padStart(2, '0')}.png`);

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

  return (
    <div className={styles.container}>
      <div className={styles.map} {...events} ref={ref}>
        <img className={styles.image} src="/map.png" alt="cat" ref={imageRef}  id="container"/>
        <div className={styles.user} id="me">
          <CanvasImageSequence fps={24} loop autoPlay data={IMAGES} />
        </div>
        <div className={styles.user} id="holden">
          <CanvasImageSequence fps={24} loop autoPlay data={IMAGES} />
        </div>
        <div className={styles.user} id="ray">
          <CanvasImageSequence fps={24} loop autoPlay data={IMAGES} />
        </div>
        <div className={styles.user} id="hazel">
          <CanvasImageSequence fps={24} loop autoPlay data={IMAGES} />
        </div>
        <div className={styles.user} id="daniel">
          <CanvasImageSequence fps={24} loop autoPlay data={IMAGES} />
        </div>
        <div className={styles.user} id="jenny">
          <CanvasImageSequence fps={24} loop autoPlay data={IMAGES} />
        </div>
      </div>
    </div>
  );
};

export default Map;
