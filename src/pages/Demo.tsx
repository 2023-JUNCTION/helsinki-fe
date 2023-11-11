import React, { useEffect } from 'react';
import { API } from '~/api';

const Demo = () => {
  useEffect(() => {
    (async () => {
      try {
        const result = await API.Test.readHealthCheck();
        console.log(result);
      } catch (e) {
        console.log(e, 'error');
      }
    })();
  }, []);
  return <div>Demo</div>;
};

export default Demo;
