import React from 'react';
import API from '../../apis/API';
import SearchBar from './SearchBar';
import ListDetail from './ListDetail';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { queryList: null };
  }

  componentDidMount() {
    this.onTermSubmit();
  }

  onTermSubmit = async (term) => {
    const response = await API.instance.get('/user', {
      params: { name: term },
    });
    this.setState({
      queryList: response.data[term],
    });
  };

  onSelect = (q) => {
    this.setState({ queryList: q });
  };

  render() {
    const { queryList } = this.state;
    return (
      <div className="ui container" style={{ marginTop: '10px' }}>
        <SearchBar onFormSubmit={this.onTermSubmit} />
        <ListDetail query={queryList} />
      </div>
    );
  }
}

export default Search;
