import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import Router from './Router';
import API from '../apis/API';

// initialize our application here
const Main = () => {
  const [loaded, setLoaded] = useState(false);
  const token = useSelector((state) => state.token);

  // add auth token to API on init
  useEffect(() => {
    if (token) {
      API.setAuthToken(token);
    }
    setLoaded(true);
  }, []);

  if (!loaded) {
    return null;
  }

  return <Router />;
};

export default Main;
