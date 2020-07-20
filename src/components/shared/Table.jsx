import React from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRow';

// This is a function instead of a class because it does not have state
// This function only processes the passed props from a parent componenet
// The parent component will deal with state and pass it to children when needed
// This function can be used with any Parent that passes it the correct props
export default function Table(props) {
  // set "headers" and "rows" from props
  // these props may be passed from any parent component e.g. UserIndex.js
  const { headers, rows, select, selected, handleSelect } = props;

  const formattedHeaders = headers.map((header) => {
    switch (header) {
      case 'userID':
        return 'User ID';
      case 'userLevelID':
        return 'Role';
      case 'email':
        return 'Email';
      case 'password':
        return 'Password';
      case 'firstName':
        return 'First Name';
      case 'lastName':
        return 'Last Name';
      case 'createdAt':
        return 'Date Created';
      case 'updatedAt':
        return 'Date Updated';
      case 'productID':
        return 'Product ID';
      case 'code':
        return 'Code';
      case 'descript':
        return 'Description';
      case 'price':
        return 'Price';
      case 'expirable':
        return 'Expirable';
      default:
        return 'Failure';
    }
  });

  const selectSpace = select ? <th /> : null;

  return (
    <div className="row justify-content-center">
      <div className="col-auto">
        <table className="table-responsive p-1">
          <thead>
            <tr>
              {selectSpace}
              {formattedHeaders.map((formattedHeader) => {
                return (
                  <th className="border border-dark p-1 align-middle">
                    {formattedHeader}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => {
              return (
                <TableRow
                  row={row}
                  select={select}
                  selected={selected}
                  handleSelect={handleSelect}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// declare what props and type of props are neccesary for component
Table.propTypes = {
  // the "headers" prop must be an array of strings
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,

  // the "rows" prop is an array of objects
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};
