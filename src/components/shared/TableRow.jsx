import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

class TableRow extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e) {
    const { handleSelect } = this.props;
    handleSelect(parseInt(e.target.value, 10));
  }

  render() {
    const { row, select, selected } = this.props;
    const rowClasses = 'border border-dark p-1 align-middle';

    let selectButton = null;

    if (select) {
      if (selected === row.userID) {
        selectButton = (
          <td>
            <Button
              onClick={this.handleSelect}
              value={row.userID}
              variant="primary"
            >
              Select
            </Button>
          </td>
        );
      } else {
        selectButton = (
          <td>
            <Button
              onClick={this.handleSelect}
              value={row.userID}
              variant="outline-primary"
            >
              Select
            </Button>
          </td>
        );
      }
    }

    return (
      <tr>
        {selectButton}

        {Object.entries(row).map(([key, value]) => {
          return <td className={rowClasses}>{value}</td>;
        })}
      </tr>
    );
  }
}
TableRow.propTypes = {
  row: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default TableRow;
