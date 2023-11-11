/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';
import CanvasImageSequence from 'react-canvas-image-sequence';

import styles from './Map.module.scss';

const IMAGES = Array.from({ length: 30 }, (_v, i) => `Red hair Waking00${String(i + 1).padStart(2, '0')}.png`);

const Map = () => {
  const ref = useRef<any>(null);
  const { events } = useDraggable(ref, {
    applyRubberBandEffect: true,
    decayRate: 0.96,
  });

  return (
    <div className={styles.container}>
      <div className={styles.map} {...events} ref={ref}>
        <img className={styles.image} src="/cat1.png" alt="cat" />
        <button type="button" onClick={() => console.log('??')} style={{ zIndex: 3, position: 'absolute' }}>
          <CanvasImageSequence
            width="300px"
            style={{ top: '100px', left: '100px' }}
            fps={24}
            loop
            autoPlay
            data={IMAGES}
          />
        </button>
        <CanvasImageSequence
          className={styles.avatar2}
          fps={24}
          loop
          autoPlay
          height="400px"
          width="200px"
          data={IMAGES}
          id="df"
        />
        <CanvasImageSequence
          className={styles.avatar3}
          fps={24}
          loop
          autoPlay
          height="400px"
          width="200px"
          data={IMAGES}
        />
        <CanvasImageSequence
          className={styles.avatar4}
          fps={24}
          loop
          autoPlay
          height="400px"
          width="200px"
          data={IMAGES}
        />
        <CanvasImageSequence
          className={styles.avatar5}
          fps={24}
          loop
          autoPlay
          height="400px"
          width="200px"
          data={IMAGES}
        />
        <CanvasImageSequence
          className={styles.avatar6}
          fps={24}
          loop
          autoPlay
          height="400px"
          width="200px"
          data={IMAGES}
        />
      </div>
    </div>
  );
};

export default Map;
