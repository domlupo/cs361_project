import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import API from '../../apis/API'; // library for AJAX functions
import Header, { HeaderPadding } from '../Navigation/Header';
import TransactionListItem from './TransactionListItem';
import './Transaction.css';

function TransactionStats() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.instance.get('/transaction').then((res) => {
      setTransactions(res.data);
      setLoading(false);
    });
  }, []);

  const renderData = () => {
    if (loading) return <ReactLoading color="#e26d5c" />;
    const sales = transactions.filter((t) => t.endLoc === 'sold');
    console.log(sales);
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

  const renderPlot = () => {
    if (loading) return <ReactLoading color="#e26d5c" />;
    const sales = transactions.filter((t) => t.endLoc === 'sold');
    console.log(sales);
    return (
      <BarChart
        width={600}
        height={300}
        data={sales}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="price" fill="#8884d8" />
      </BarChart>
    );
  };

  return (
    <div className="container">
      <Header />
      <HeaderPadding />
      <div className="SalesPlot">{renderPlot()}</div>
    </div>
  );
}

export default TransactionStats;
