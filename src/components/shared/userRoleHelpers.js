function getRoleFromID(id) {
  if (process.env.NODE_ENV === 'development') {
    switch (id) {
      case 1:
        return 'owner';
      case 2:
        return 'manager';
      case 3:
        return 'buyer';
      case 4:
        return 'cashier';
      default:
        return '';
    }
  } else {
    switch (id) {
      case 1:
        return 'owner';
      case 11:
        return 'manager';
      case 21:
        return 'buyer';
      case 31:
        return 'cashier';
      default:
        return '';
    }
  }
}

function getIDfromRole(role) {
  if (process.env.NODE_ENV === 'development') {
    switch (role.toLowerCase()) {
      case 'owner':
        return 1;
      case 'manager':
        return 2;
      case 'buyer':
        return 3;
      case 'cashier':
        return 4;
      default:
        return null;
    }
  } else {
    switch (role.toLowerCase()) {
      case 'owner':
        return 1;
      case 'manager':
        return 11;
      case 'buyer':
        return 21;
      case 'cashier':
        return 31;
      default:
        return null;
    }
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
