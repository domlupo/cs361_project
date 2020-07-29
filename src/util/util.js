export const isDevelopment = () => {
  return process.env.NODE_ENV === 'development';
};

export const isManagement = (user) => {
  return user.userLevelID === 1 || user.userLevelID === 2;
};

export const isCashier = (user) => {
  return isManagement(user) || user.userLevelID === 3;
};

export const isBuyer = (user) => {
  return isManagement(user) || user.userLevelID === 4;
};
