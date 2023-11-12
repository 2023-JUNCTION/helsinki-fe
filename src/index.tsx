/* eslint-disable */
import React, { RefObject, createRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { RouterProvider, createBrowserRouter, useLocation, useOutlet } from 'react-router-dom';
import Detail from '~/pages/Detail';
import { Button, Toast } from './components';
import Modal from '~/components/common/Modal';
import Map from './pages/Map';
import Mission from './pages/Mission';
import User from '~/api/transports/User';
import { Provider, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import Alert from './pages/Alert';

import styles from './index.module.scss';
import '~/scss/_reset.scss';

export const routes = [
  { path: '/', name: 'Map', element: <Map />, nodeRef: createRef() },
  { path: '/detail', name: 'Detail', element: <Detail />, nodeRef: createRef() },
  { path: '/mission', name: 'Mission', element: <Mission />, nodeRef: createRef() },
  { path: '/asdf', name: 'Alert', element: <Alert />, nodeRef: createRef() },

];

export const grantState = atomWithStorage('grant', false);

const Root = () => {
  const location = useLocation();
  const [_fetching, _setFetching] = useState(false);
  const currentOutlet = useOutlet();
  const { nodeRef } = routes.find(route => route.path === location.pathname) as { nodeRef: RefObject<HTMLDivElement> };
  const [isOpen, setIsOpen] = useState(!localStorage.getItem('userId'));
  const [isLoading, setIsLoading] = useState(false);

  const [isGranted, setIsGranted] = useAtom(grantState);
  const [_userLocation, setUserLocation] = useState<{ latitude?: number; longitude?: number }>({
    latitude: undefined,
    longitude: undefined,
  });

  const getUserLocation = () => {
    setIsLoading(true);

    // if geolocation is supported by the users browser
    if (navigator.geolocation) {
      // get the current users location
      navigator.geolocation.getCurrentPosition(
        position => {
          // save the geolocation coordinates in two variables
          const { latitude, longitude } = position.coords as any;
          // update the value of userlocation variable
          setUserLocation({ latitude, longitude });
          setIsOpen(false);
          setIsLoading(false);
          setIsGranted(true);
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

  useEffect(() => {
    if (isGranted) {
      getUserLocation();
    }
  }, [isGranted]);

  if (!nodeRef) return null;

  // useEffect(() => {
  //   return () => {
  //   };
  // }, []);

  // useEffect(() => {
  //   if (!userLocation || userLocation.latitude === undefined || userLocation.longitude === undefined) {
  //     return
  //   }

  //   if (localStorage.getItem('userId') != null) {
  //     setIsOpen(false);
  //     return
  //   }

  //   if (fetching) {
  //     return
  //   }

  //   // // 게스트 가입/로그인
  //   // (async () => {
  //   //   setFetching(true)
  //   //   const response = await User.createUser(userLocation.latitude ?? 0, userLocation.longitude ?? 0);
  //   //   localStorage.setItem('userId', String(response.id));
  //   //   setFetching(false)
  //   //   setIsOpen(false);
  //   //   setIsLoading(false);
  //   // })();
  // }, [userLocation]);

  return (
    <Provider>
      <main className={styles.page}>
        <SwitchTransition>
          <CSSTransition
            key={location.pathname}
            nodeRef={nodeRef}
            timeout={300}
            classNames={{
              enter: styles.page_enter,
              enterActive: styles.page_enter_active,
              exit: styles.page_exit,
              exitActive: styles.page_exit_active,
            }}
            unmountOnExit
          >
            {() => (
              <div ref={nodeRef} className={styles.content}>
                {currentOutlet}
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
        <Modal isOpen={isOpen && !isGranted}>
          <div className={styles.modal_title}>
            Get User Location,
            <br />
            Motion Data
          </div>
          <Button
            type="button"
            onClick={() => {
              setInterval(getUserLocation, 1000);
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Agree'}
          </Button>
        </Modal>
        <Toast />
      </main>
    </Provider>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: routes.map(route => ({
      index: route.path === '/',
      path: route.path === '/' ? undefined : route.path,
      element: route.element,
    })),
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<RouterProvider router={router} />);
