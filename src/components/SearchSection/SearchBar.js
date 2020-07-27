import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { term: [] };
  }

  onInputChange = (event) => {
    this.setState({ term: event.target.value });
  };

  onFormSubmit = (event) => {
    const { term } = this.state;
    const { onFormSubmit } = this.props;
    event.preventDefault();
    onFormSubmit(term);
  };

  render() {
    const { term } = this.state;
    const { onInputChange } = this.props;
    return (
      <Form onSubmit={this.onFormSubmit} style={{ width: '100%' }}>
        <Form.Control
          type="text"
          value={onInputChange ? undefined : term}
          placeholder="Search..."
          onChange={onInputChange || this.onInputChange}
        />
      </Form>
    );
  }
}

SearchBar.propTypes = {
  onFormSubmit: PropTypes.func,
  onInputChange: PropTypes.func,
};

export default SearchBar;
