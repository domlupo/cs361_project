function getRoleFromID(id) {
  switch (id) {
    case process.env.REACT_APP_DB_OWNER_ID:
      return 'owner';
    case process.env.REACT_APP_DB_MANAGER_ID:
      return 'manager';
    case process.env.REACT_APP_DB_BUYER_ID:
      return 'buyer';
    case process.env.REACT_APP_DB_CASHIER_ID:
      return 'cashier';
    default:
      return '';
  }
}

function getIDfromRole(role) {
  switch (role.toLowerCase()) {
    case 'owner':
      return process.env.REACT_APP_DB_OWNER_ID;
    case 'manager':
      return process.env.REACT_APP_DB_MANAGER_ID;
    case 'buyer':
      return process.env.REACT_APP_DB_BUYER_ID;
    case 'cashier':
      return process.env.REACT_APP_DB_CASHIER_ID;
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
