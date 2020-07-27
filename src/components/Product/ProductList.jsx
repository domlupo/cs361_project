import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { includes } from 'lodash';

import API from '../../apis/API';
import Header, { HeaderPadding } from '../Navigation/Header';
import ProductListItem from './ProductListItem';

import './ProductList.css';
import SearchBar from '../SearchSection/SearchBar';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const onInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    API.instance.get('/product').then((res) => {
      setProducts(res.data);
      setProductData(res.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const searchQuery = searchTerm.toLowerCase();
    const newProducts = productData.filter(
      (product) =>
        includes(product.name, searchQuery) ||
        includes(product.code, searchQuery) ||
        includes(product.descript, searchQuery),
    );
    setProducts(newProducts);
  }, [searchTerm]);

  const renderData = () => {
    if (loading) return <ReactLoading color="#e26d5c" />;
    return (
      <>
        {products.map((product) => (
          <ProductListItem product={product} key={product.productID} />
        ))}
      </>
    );
  };

  return (
    <div className="container">
      <Header>
        <SearchBar onInputChange={onInputChange} />
      </Header>
      <HeaderPadding />
      <div className="ProductList">{renderData()}</div>
    </div>
  );
}

export default ProductList;
