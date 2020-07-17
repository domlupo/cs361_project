import React from 'react';
import PropTypes from 'prop-types';

export default function TableRow(props) {
  const { row } = props;
  const rowClasses = 'border border-dark p-1 align-middle';

  return (
    <tr>
      {Object.entries(row).map(([key, value]) => {
        return <td className={rowClasses}>{value}</td>;
      })}
    </tr>
  );
}
TableRow.propTypes = {
  row: PropTypes.objectOf(PropTypes.object).isRequired,
};
