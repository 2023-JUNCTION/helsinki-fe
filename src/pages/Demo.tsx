/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect, useRef, useState } from 'react';
import CanvasImageSequence from 'react-canvas-image-sequence';
import { API } from '~/api';

const Demo = () => {
  const [, setStep] = useState<number>(0);
  const [granted, setGranted] = useState(false);

  const flag = useRef(false);
  const yg = useRef(0);

  useEffect(() => {
    (async () => {
      await API.Test.readHealthCheck();
    })();

    if (typeof (window as any).DeviceMotionEvent.requestPermission === 'function') {
      (window as any).DeviceMotionEvent.requestPermission().then((permissionState: any) => {
        if (permissionState === 'granted') {
          window.addEventListener('devicemotion', () => {});
        }
      });
    } else {
      // handle regular non iOS 13+ devices
    }

    // (window as any).DeviceMotionEvent.requestPermission().then((permissionState: any) => {
    //   if (permissionState === 'granted') {
    //     window.addEventListener('devicemotion', motionHandler, true);
    //   }
    // });
    // window.addEventListener('devicemotion', motionHandler, true);
    // window.addEventListener('deviceorientation', orientationHandler, true);
  }, []);

  async function onClick() {
    function motionHandler(event: { accelerationIncludingGravity: any }) {
      const accGravity = event.accelerationIncludingGravity;
      yg.current = accGravity.y;
      return false;
    }
    function orientationHandler(event: { beta: any }) {
      if (yg.current - 10 * Math.sin((event.beta * Math.PI) / 180) > 1) {
        flag.current = true;
      }
      if (yg.current - 10 * Math.sin((event.beta * Math.PI) / 180) < -1) {
        if (flag.current === true) {
          setStep(prev => prev + 1);
          flag.current = false;
        }
      }
    }

    await (window as any).DeviceMotionEvent.requestPermission().then((permissionState: any) => {
      if (permissionState === 'granted') {
        setGranted(true);
        window.addEventListener('devicemotion', motionHandler, true);
      }
    });
    await (window as any).DeviceMotionEvent.DeviceOrientationEvent().then((permissionState: any) => {
      if (permissionState === 'granted') {
        setGranted(true);
        window.addEventListener('deviceorientation', orientationHandler, true);
      }
    });
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <img src="/huawei_black.png" alt="watch" style={{ width: 'auto', height: '80%' }} />
      <div
        style={{
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          width: 'auto',
          aspectRatio: 0.52,
          height: '46%',
          background: 'white',
          top: '50%',
          left: 'calc(50% - 3px)',
          borderRadius: 15,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button type="button" onClick={onClick}>
          권한 획득{granted ? 'yes' : 'no'}
        </button>
      </div>
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

export default Demo;
