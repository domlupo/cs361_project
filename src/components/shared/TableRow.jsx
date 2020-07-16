import React from 'react';
import PropTypes from 'prop-types';

export default function TableRow(props) {
  const { row } = props;
  const rowClasses = 'border border-dark p-1 align-middle';

  return (
    <tr>
      <td className={rowClasses}>{row.userID}</td>
      <td className={rowClasses}>{row.userLevelID}</td>
      <td className={rowClasses}>{row.email}</td>
      <td className={rowClasses}>{row.password}</td>
      <td className={rowClasses}>{row.firstName}</td>
      <td className={rowClasses}>{row.lastName}</td>
      <td className={rowClasses}>{row.createdAt}</td>
      <td className={rowClasses}>{row.updatedAt}</td>
    </tr>
  );
}
TableRow.propTypes = {
  row: PropTypes.objectOf(PropTypes.object).isRequired,
};
