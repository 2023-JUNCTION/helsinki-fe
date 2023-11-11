import React from 'react';
import CanvasImageSequence from 'react-canvas-image-sequence';

import styles from './Sequence.module.scss';

const IMAGES = Array.from({ length: 30 }, (v, i) => `Red hair Waking00${String(i + 1).padStart(2, '0')}.png`);

const Sequence = () => {
  return (
    <div className={styles.container}>
      <CanvasImageSequence fps={40} loop autoPlay height="400px" width="200px" data={IMAGES} />
    </div>
  );
};

export default Sequence;
