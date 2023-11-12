/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useDeviceMotion } from '../hooks';

const Demo = () => {
  const { step, jumpingJackCount, startMotion } = useDeviceMotion();
  // const variable array to save the users location
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number }>({
    latitude: 0,
    longitude: 0,
  });

  // define the function that finds the users geolocation
  const getUserLocation = () => {
    // if geolocation is supported by the users browser
    if (navigator.geolocation) {
      // get the current users location
      navigator.geolocation.getCurrentPosition(
        position => {
          // save the geolocation coordinates in two variables
          const { latitude, longitude } = position.coords as any;
          // update the value of userlocation variable
          setUserLocation({ latitude, longitude });
        },
        // if there was an error getting the users location
        () => {
          // error
        },
      );
    }
    // if geolocation is not supported by the users browser
    else {
      // error
    }
  };
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
        <button type="button" onClick={startMotion}>
          grant
        </button>
        {step}
        <br />
        {jumpingJackCount}
        <button type="button" onClick={() => setInterval(getUserLocation, 1000)}>
          Get User Location
        </button>
        {/* if the user location variable has a value, print the users location */}
        {userLocation && (
          <div>
            <h2>User Location</h2>
            <p>Latitude: {userLocation.latitude}</p>
            <p>Longitude: {userLocation.longitude}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Demo;
