const moment = require('moment');
const constants = require('../constants/constants');

const getNow = () => {
  return moment();
};

const getNowFormatted = () => {
  return getNow().format(constants.dateFormat);
};

module.exports = {
  getNow,
  getNowFormatted,
};
