export const isDevelopment = () => {
  return process.env.NODE_ENV === 'development';
};

export const isManagement = (user) => {
  return (
    user.userLevelID === process.env.REACT_APP_DB_OWNER_ID ||
    user.userLevelID === process.env.REACT_APP_DB_MANAGER_ID
  );
};

export const isBuyer = (user) => {
  return (
    isManagement(user) || user.userLevelID === process.env.REACT_APP_DB_BUYER_ID
  );
};

export const isCashier = (user) => {
  return isManagement(user) || process.env.REACT_APP_DB_CASHIER_ID;
};
