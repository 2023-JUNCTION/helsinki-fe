/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect, useRef, useState } from 'react';
import CanvasImageSequence from 'react-canvas-image-sequence';
import { API } from '~/api';

const Demo = () => {
  const [step, setStep] = useState<number>(0);
  const flag = useRef(false);
  const yg = useRef(0);

  alert(step);

  useEffect(() => {
    (async () => {
      try {
        const result = await API.Test.readHealthCheck();
        console.log(result);
      } catch (e) {
        console.log(e, 'error');
      }
    })();

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

    if (typeof window.DeviceMotionEvent.requestPermission === 'function') {
      window.DeviceMotionEvent.requestPermission()
        .then(permissionState => {
          alert(`a${permissionState}`);
          if (permissionState === 'granted') {
            window.addEventListener('devicemotion', () => {});
          }
        })
        .catch(console.error);
    } else {
      alert('b');
      // handle regular non iOS 13+ devices
    }

    if (window.DeviceMotionEvent && window.DeviceOrientationEvent) {
      window.addEventListener('devicemotion', motionHandler, true);
      window.addEventListener('deviceorientation', orientationHandler, true);
    }
  }, []);

  async function onClick() {
    alert('asdf');
    await window.DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        alert(`AAA${permissionState}`);
        if (permissionState === 'granted') {
          window.addEventListener('devicemotion', () => {});
        }
      })
      .catch(console.error);

    // feature detect
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            window.addEventListener('devicemotion', () => {});
          }
        })
        .catch(console.error);
    } else {
      // handle regular non iOS 13+ devices
    }
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', () => {});
          }
        })
        .catch(console.error);
    } else {
      // handle regular non iOS 13+ devices
    }
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
        demo
      </div>
      <CanvasImageSequence
        fps={1}
        loop
        autoPlay
        height={200}
        width={200}
        data={['/huawei_black.png', '/huawei_khaki.png', '/huawei.pink.png']}
      />
      <div>{step}aaa</div>
      <button type="button" onClick={onClick}>
        sdfdsf
      </button>
    </div>
  );
};

export default Demo;
