import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { includes } from 'lodash';
import API from '../../apis/API'; // library for AJAX functions
import Header, { HeaderPadding } from '../Navigation/Header';
import TransactionListItem from './TransactionListItem';
import ProductList from '../Product/ProductList';
import './Transaction.css';

function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const onInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    API.instance.get('/transaction').then((res) => {
      setTransactions(res.data);
      setTransactionData(res.data);
      setLoading(false);
    });
  }, []);

  const renderData = () => {
    if (loading) return <ReactLoading color="#e26d5c" />;
    return (
      <>
        {transactions.map((transaction) => (
          <TransactionListItem
            transaction={transaction}
            key={transaction.transactionID}
          />
        ))}
      </>
    );
  };

  return (
    <div className="container">
      <Header />
      <HeaderPadding />
      <div className="TransactionList">{renderData()}</div>
    </div>
  );
}

export default TransactionList;
