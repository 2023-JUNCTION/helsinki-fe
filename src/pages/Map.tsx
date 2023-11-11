/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef } from 'react';
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

  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    ref.current.scrollTo(
      (imageRef.current!.getBoundingClientRect().width - ref.current!.getBoundingClientRect().width) / 2,
      (imageRef.current!.getBoundingClientRect().height - ref.current!.getBoundingClientRect().height) / 2,
    );
    document.getElementById('me')!.style.top = `${imageRef.current!.getBoundingClientRect().height / 2}`;
    document.getElementById('me')!.style.left = `${imageRef.current!.getBoundingClientRect().width / 2}`;
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.map} {...events} ref={ref}>
        <img className={styles.image} src="/map.png" alt="cat" ref={imageRef} />
        <div className={styles.me} id="me">
          <CanvasImageSequence fps={24} loop autoPlay data={IMAGES} />
        </div>
        <CanvasImageSequence fps={24} loop autoPlay data={IMAGES} />
        <CanvasImageSequence fps={24} loop autoPlay data={IMAGES} />
        <CanvasImageSequence fps={24} loop autoPlay data={IMAGES} />
        <CanvasImageSequence fps={24} loop autoPlay data={IMAGES} />
      </div>
    </div>
  );
};

export default Map;
