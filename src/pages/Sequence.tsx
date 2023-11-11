import React from 'react';
import CanvasImageSequence from 'react-canvas-image-sequence';

const Sequence = () => {
  return (
    <div>
      <CanvasImageSequence
        fps={1}
        loop
        autoPlay
        height={200}
        width={200}
        data={['/huawei_black.png', '/huawei_khaki.png', '/huawei.pink.png']}
      />
    </div>
  );
};

export default Sequence;
