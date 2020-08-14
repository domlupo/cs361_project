import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { FormLabel, FormGroup, FormControl } from 'react-bootstrap';
// import { getSalesInRange } from './TransactionDataUtil.js';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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

  const salesInRange = dataUtil.getSalesInRange(
    transactions,
    startDate,
    endDate,
  );
  console.log(salesInRange);
  const incomeByDay = dataUtil.getIncomeByDay(salesInRange);
  console.log(incomeByDay[0]);

  const renderPlot = () => {
    if (loading) return <ReactLoading color="#e26d5c" />;
    return (
      <BarChart
        width={600}
        height={300}
        data={salesInRange}
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

  const filteredData = () => {
    if (loading) return <ReactLoading color="#e26d5c" />;
    return (
      <>
        {salesInRange.map((transaction) => (
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
      <div className="SalesPlot">{renderPlot()}</div>
      <div className="DateInputs">{dateInputs()}</div>
      <div className="FilteredData">{filteredData()}</div>
    </div>
  );
}

export default TransactionStats;
