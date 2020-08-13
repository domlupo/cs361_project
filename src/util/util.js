export const isDevelopment = () => {
  return process.env.NODE_ENV === 'development';
};

export const isOwner = (user) => {
  return user.userLevelID === parseInt(process.env.REACT_APP_DB_OWNER_ID, 10);
};

export const isManagement = (user) => {
  return (
    user.userLevelID === parseInt(process.env.REACT_APP_DB_OWNER_ID, 10) ||
    user.userLevelID === parseInt(process.env.REACT_APP_DB_MANAGER_ID, 10)
  );
};

export const isBuyer = (user) => {
  return (
    isManagement(user) ||
    user.userLevelID === parseInt(process.env.REACT_APP_DB_BUYER_ID, 10)
  );
};

export const isCashier = (user) => {
  return (
    isManagement(user) ||
    user.userLevelID === parseInt(process.env.REACT_APP_DB_CASHIER_ID, 10)
  );
};
