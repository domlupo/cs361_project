import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { FormLabel, FormGroup, FormControl } from 'react-bootstrap';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from 'recharts';

import { isDate } from 'moment';
import API from '../../apis/API'; // library for AJAX functions
import Header, { HeaderPadding } from '../Navigation/Header';
import TransactionListItem from './TransactionListItem';
import './Transaction.css';

const dataUtil = require('./dataUtil');

function TransactionStats() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date(2020, 1));
  const [endDate, setEndDate] = useState(new Date());

  const handleStartChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndChange = (event) => {
    setEndDate(event.target.value);
  };

  useEffect(() => {
    API.instance.get('/transaction').then((res) => {
      setTransactions(res.data);
      setLoading(false);
    });
  }, []);

  console.log(transactions);

  const salesInRange = dataUtil.getSalesInRange(
    transactions,
    startDate,
    endDate,
  );

  const incomeByDay = dataUtil.getIncomeByDay(salesInRange);

  const purchasesInRange = dataUtil.getPurchasesInRange(
    transactions,
    startDate,
    endDate,
  );

  const restocksInRange = dataUtil.getRestocksInRange(
    transactions,
    startDate,
    endDate,
  );

  const renderPlot = () => {
    if (loading) return <ReactLoading color="#e26d5c" />;
    if (incomeByDay.length > 0)
      return (
        <div>
          <h3>Income vs. Date</h3>
          <LineChart width={600} height={400} data={incomeByDay}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis label="Date" dataKey="date" interval="preserveEnd" />
            <YAxis label="$" interval="preserveEnd" />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
      );
  };

  const dateInputs = () => {
    if (loading) return <ReactLoading color="#e26d5c" />;
    return (
      <div className="container">
        <FormGroup bssize="large">
          <FormLabel>Start Date</FormLabel>
          <FormControl
            name="startDate"
            type="date"
            value={startDate}
            onChange={handleStartChange}
          />
        </FormGroup>

        <FormGroup bssize="large">
          <FormLabel>End Date</FormLabel>
          <FormControl
            name="startDate"
            type="date"
            value={endDate}
            onChange={handleEndChange}
          />
        </FormGroup>
      </div>
    );
  };

  const filteredSales = () => {
    if (loading) return <ReactLoading color="#e26d5c" />;
    return (
      <>
        <h3>Sales Transactions in Date Range</h3>
        {salesInRange.map((transaction) => (
          <TransactionListItem
            transaction={transaction}
            key={transaction.transactionID}
          />
        ))}
      </>
    );
  };

  const filteredPurchases = () => {
    if (loading) return <ReactLoading color="#e26d5c" />;
    return (
      <>
        <h3>Purchase Transactions in Date Range</h3>
        {purchasesInRange.map((transaction) => (
          <TransactionListItem
            transaction={transaction}
            key={transaction.transactionID}
          />
        ))}
      </>
    );
  };

  const filteredRestocks = () => {
    if (loading) return <ReactLoading color="#e26d5c" />;
    return (
      <>
        <h3>Restock Transactions in Date Range</h3>
        {restocksInRange.map((transaction) => (
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
      <div className="DateInputs">{dateInputs()}</div>
      <div className="SalesPlot">{renderPlot()}</div>
      <div className="FilteredSales">{filteredSales()}</div>
      <div className="FilteredPurchases">{filteredPurchases()}</div>
      <div className="FilteredRestocks">{filteredRestocks()}</div>
    </div>
  );
}

export default TransactionStats;
