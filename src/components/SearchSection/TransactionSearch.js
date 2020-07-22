import React from 'react';
import API from '../../apis/API';
import SearchBar from './SearchBar';
import TransactionListDetail from './TransactionListDetail';

class TransactionSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { queryList: null };
  }

  componentDidMount() {
    this.onTermSubmit();
  }

  onTermSubmit = async (term) => {
    const response = await API.instance.get('/transactions', {
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
        <TransactionListDetail query={queryList} />
      </div>
    );
  }
}

export default TransactionSearch;
