import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import API from '../../apis/API'; // library for AJAX functions
import Table from '../shared/Table';

// This component is a class because it has state. Having state is neccesary
// because the page will render before the AJAX is complete. Once the AJAX
// is processed and returned from backend we setState() which will automatically
// rerender the component with the new state. An additional reason this
// componenet has state is because if AJAX fails, no results will be available
// to render
class UsersIndex extends Component {
  constructor(props) {
    super(props);

    // initial state which will get updated from AJAX
    this.state = {
      index: [],
      selected: null,
    };

    this.getUsers = this.getUsers.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  // after component mounts ( mount is React term for after the initital render)
  componentDidMount() {
    // call function to send AJAX to backend
    this.getUsers();
  }

  getUsers() {
    // AJAX call to /api/user
    API.instance
      .get('/user')
      .then((res) => {
        // update state based on return JSON from backend
        // React will automatically rerender the component after state updates.
        // Always use setState to update state. Updating state directly
        // can cause errors.
        this.setState({ index: res.data });
      })
      .catch((error) => console.log(error.response));
  }

  handleSelect(id) {
    this.setState({ selected: id });
  }

  handleEdit() {
    const { history } = this.props;
    const { selected } = this.state;

    history.push(`/user-edit/${selected}`);
  }

  // This render function is called when component first renders
  // e.g. user clicks on link or when setState updates state
  render() {
    // set index from state
    const { index } = this.state;
    const { selected } = this.state;

    // set tableHeaders to index keys unless index is empty set to empty array
    const tableHeaders = index.length ? Object.keys(index[0]) : [];

    // below is the HTML and components being returned
    // We can pass data to other React components by using "props"
    // e.g. The "Table" component has several props. One is called "headers"
    // and we set the data within headers to "tableHeaders" which is
    // is set within the render() function.
    return (
      <div className="container-fluid text-center">
        <Table
          headers={tableHeaders}
          rows={index}
          select
          selected={selected}
          handleSelect={this.handleSelect}
        />
        <div>
          {index.length ? (
            <Button onClick={this.handleEdit}>Edit</Button>
          ) : (
            <div>Please login to see users.</div>
          )}
        </div>
      </div>
    );
  }
}
export default UsersIndex;
