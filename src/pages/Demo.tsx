/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect, useState } from 'react';
import { API } from '~/api';

const Demo = () => {
  const [step, setStep] = useState<number>(0);
  const [granted, setGranted] = useState(false);
  const [orientGranted, setOrientGranted] = useState(false);

  const [flag, setFlag] = useState(false);
  const [yg, setYg] = useState(0);
  const [beta, setBeta] = useState(0);

  function motionHandler(event: { accelerationIncludingGravity: any }) {
    setGranted(true);
    const accGravity = event.accelerationIncludingGravity;
    setYg(accGravity.y);
    return false;
  }
  function orientationHandler(event: { beta: any }) {
    setOrientGranted(true);
    setBeta(event.beta);
    if (yg < -8) {
      setFlag(true);
    }
    if (yg > 8) {
      if (flag === true) {
        setStep(prev => prev + 1);
        setFlag(false);
      }
    }
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
          회전 권한 획득{orientGranted ? 'yes' : 'no'}
        </button>
        <br />
        step: {step}
        <br />
        flag: {flag ? 'yes' : 'no'}
        <br />
        yg: {yg}
        <br />
        beta: {beta}
      </div>
    </div>
  );
};

export default Demo;
