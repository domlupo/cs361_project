function getRoleFromID(id) {
  switch (id) {
    case parseInt(process.env.REACT_APP_DB_OWNER_ID, 10):
      return 'owner';
    case parseInt(process.env.REACT_APP_DB_MANAGER_ID, 10):
      return 'manager';
    case parseInt(process.env.REACT_APP_DB_BUYER_ID, 10):
      return 'buyer';
    case parseInt(process.env.REACT_APP_DB_CASHIER_ID, 10):
      return 'cashier';
    default:
      return '';
  }
}

function getIDfromRole(role) {
  switch (role.toLowerCase()) {
    case 'owner':
      return parseInt(process.env.REACT_APP_DB_OWNER_ID, 10);
    case 'manager':
      return parseInt(process.env.REACT_APP_DB_MANAGER_ID, 10);
    case 'buyer':
      return parseInt(process.env.REACT_APP_DB_BUYER_ID, 10);
    case 'cashier':
      return parseInt(process.env.REACT_APP_DB_CASHIER_ID, 10);
    default:
      return null;
  }
}

// returns true if role is valid, false otherwise
function validRole(role) {
  if (
    role.toLowerCase() === 'owner' ||
    role.toLowerCase() === 'manager' ||
    role.toLowerCase() === 'buyer' ||
    role.toLowerCase() === 'cashier'
  ) {
    return true;
  }

  return false;
}

module.exports = { getRoleFromID, getIDfromRole, validRole };
