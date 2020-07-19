import React from 'react';
import API from '../../apis/API';
import SearchBar from './SearchBar';
import ProductListDetail from './ProductListDetail';

class ProductSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { queryList: null };
  }

  componentDidMount() {
    this.onTermSubmit();
  }

  onTermSubmit = async (term) => {
    const response = await API.instance.get('/product', {
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
        <ProductListDetail query={queryList} />
      </div>
    );
  }
}

export default ProductSearch;
