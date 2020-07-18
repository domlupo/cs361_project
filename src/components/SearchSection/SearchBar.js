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
    return (
      <div className="search-bar ui segment">
        <Form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <Form.Label>Query Search</Form.Label>
            <input type="text" value={term} onChange={this.onInputChange} />
          </div>
        </Form>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
