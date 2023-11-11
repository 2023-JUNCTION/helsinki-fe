/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { API } from '~/api';

const Demo = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [step, setStep] = useState<number>(0);
  const [granted, setGranted] = useState(false);
  // const [orientGranted, setOrientGranted] = useState(false);

  const upRef = useRef(false);
  const accYRef = useRef(false);
  const upAndDownRef = useRef(false);

  const [yg, setYg] = useState(0);
  const [count, setCount] = useState(0);

  const [result, setResult] = useState('');
  // const [beta, setBeta] = useState(0);

  const motionHandler = useCallback((event: DeviceMotionEvent) => {
    setGranted(true);
    const accGravity = event.accelerationIncludingGravity;
    const acc = event.acceleration;

    const accY = acc?.y ?? 0;
    const accGravityY = accGravity?.y ?? 0;

    setYg(accGravityY);

    if (Number(accGravityY) < -5 && !upRef.current) {
      upRef.current = true;
    }

    if (Number(accY) > 3) {
      accYRef.current = true;
      setResult(prevState => `${prevState} accY => ${accY}`);
    }

    if (Number(accGravityY) > 5 && upRef.current) {
      upAndDownRef.current = true;
      setResult(prevState => `${prevState} upAndDownRef.current => ${upAndDownRef.current}`);
    }

    if (upAndDownRef.current && accYRef.current) {
      // 성공
      setCount(prev => prev + 1);
      upRef.current = false;
      accYRef.current = false;
      upAndDownRef.current = false;
    }

    setTimeout(() => {
      upRef.current = false;
      accYRef.current = false;
      upAndDownRef.current = false;
    }, 10000);
  }, []);

  function orientationHandler() {
    // event: { beta: any }) {
    // setOrientGranted(true);
    // setBeta(event.beta);
    // if (yg < -8) {
    //   setFlag(true);
    // }
    // if (yg > 8) {
    //   if (flag === true) {
    //     setStep(prev => prev + 1);
    //     setFlag(false);
    //   }
    // }
  }

  useEffect(() => {
    (async () => {
      await API.Test.readHealthCheck();
    })();

    if (typeof (window as any).DeviceMotionEvent.requestPermission === 'function') {
      (window as any).DeviceMotionEvent.requestPermission().then((permissionState: any) => {
        if (permissionState === 'granted') {
          window.addEventListener('devicemotion', motionHandler);
        }
      });
    } else {
      // handle regular non iOS 13+ devices
    }
    if (typeof (window as any).DeviceOrientationEvent.requestPermission === 'function') {
      (window as any).DeviceOrientationEvent.requestPermission().then((permissionState: any) => {
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', orientationHandler);
        }
      });
    } else {
      // handle regular non iOS 13+ devices
    }
  }, []);

  async function onClick() {
    await (window as any).DeviceMotionEvent.requestPermission().then((permissionState: any) => {
      if (permissionState === 'granted') {
        window.addEventListener('devicemotion', motionHandler);
      }
    });
    await (window as any).DeviceOrientationEvent.requestPermission().then((permissionState: any) => {
      if (permissionState === 'granted') {
        window.addEventListener('deviceorientation', orientationHandler);
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
          자이로 권한 획득{granted ? 'yes' : 'no'}
          <br />
          {/* 회전 권한 획득{orientGranted ? 'yes' : 'no'} */}
        </button>
        <br />
        step: {step}
        <br />
        yg: {yg}
        <br />
        count: {count}
        <br />
        up&down: {upAndDownRef.current}
        <br />
        acc: {accYRef.current}
      </div>
    </div>
  );
};

export default Demo;
