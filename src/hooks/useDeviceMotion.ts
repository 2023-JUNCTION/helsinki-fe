/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from 'react';

const useDeviceMotion = () => {
  const [isDeviceMotionGranted, setIsDeviceMotionGranted] = useState(false);
  const [step, setStep] = useState<number>(0);
  const [jumpingJackCount, setJumpingJackCount] = useState(0);
  const [yg, setYg] = useState(0);
  const flagRef = useRef(false);

  const checkUpMotionRef = useRef(false);
  const accRef = useRef(false);
  const lockRef = useRef(false);

  const motionHandler = useCallback((event: { accelerationIncludingGravity: any; acceleration: any }) => {
    setIsDeviceMotionGranted(true);
    const accGravity = event.accelerationIncludingGravity;
    setYg(accGravity.y);
    if (Number(accGravity.y) > 8 && !flagRef.current) {
      flagRef.current = true;
    }
    if (Number(accGravity.y) < -8 && flagRef.current) {
      flagRef.current = false;
      setStep(prev => prev + 1);
    }

    const acc = event.acceleration;

    const accX = acc?.x ?? 0;
    const accY = acc?.y ?? 0;
    const accZ = acc?.z ?? 0;

    // eslint-disable-next-line no-shadow
    const totalAcc = [accX, accY, accZ].reduce((acc, cur) => acc + Math.abs(cur), 0);
    const accGravityY = accGravity?.y ?? 0;

    if (Number(accGravityY) > 5 && !checkUpMotionRef.current) {
      checkUpMotionRef.current = true;
    }

    if (Number(totalAcc) > 20) {
      accRef.current = true;
    }

    if (checkUpMotionRef.current && accRef.current && lockRef.current === false) {
      lockRef.current = true;
      checkUpMotionRef.current = false;
      accRef.current = false;
      setJumpingJackCount(prev => prev + 1);

      setTimeout(() => {
        lockRef.current = false;
      }, 3000);
    }
  }, []);

  useEffect(() => {
    if (typeof (window as any).DeviceMotionEvent.requestPermission === 'function') {
      (window as any).DeviceMotionEvent.requestPermission().then((permissionState: any) => {
        if (permissionState === 'granted') {
          window.addEventListener('devicemotion', motionHandler);
        }
      });
    } else {
      // handle regular non iOS 13+ devices
    }
  }, []);

  const startMotion = () => {
    if (isDeviceMotionGranted) {
      return;
    }

    (window as any).DeviceMotionEvent.requestPermission().then((permissionState: any) => {
      if (permissionState === 'granted') {
        window.addEventListener('devicemotion', motionHandler);
      }
    });
  };

  const reset = () => {
    setStep(0);
    setJumpingJackCount(0);
  };

  const terminateMotion = () => {
    reset();
    window.removeEventListener('devicemotion', motionHandler);
  };

  return {
    step,
    jumpingJackCount,
    reset,
    isDeviceMotionGranted,
    terminateMotion,
    startMotion,
    yg,
  };
};

export default useDeviceMotion;
