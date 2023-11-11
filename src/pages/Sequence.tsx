import React from 'react';
import CanvasImageSequence from 'react-canvas-image-sequence';

import styles from './Sequence.module.scss';

const Sequence = () => {
  return (
    <div className={styles.container}>
      <CanvasImageSequence
        fps={1}
        loop
        autoPlay
        height="400px"
        width="200px"
        data={['/huawei_black.png', '/huawei_khaki.png', '/huawei_pink.png']}
      />
    </div>
  );
};

export default Sequence;
