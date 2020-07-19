import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import AppRoutes from './AppRoutes';
import API from '../apis/API';
import AuthRouter from './AuthRouter';

// initialize our application here
const App = () => {
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

  return <AuthRouter />;
};

export default App;
