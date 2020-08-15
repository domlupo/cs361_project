import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { Row, Col, FormLabel, FormGroup, FormControl } from 'react-bootstrap';

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
  // HACK which hard codes initial date range from 2020 - 2025
  const [startDate, setStartDate] = useState(new Date(2020, 0, 1));
  const [endDate, setEndDate] = useState(new Date(2025, 0, 1));

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
        <Row>
          <Col>
            <h3 className="text-center">Income vs. Date</h3>
            <LineChart width={600} height={400} data={incomeByDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" interval="preserveEnd" />
              <YAxis interval="preserveEnd" />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </Col>
        </Row>
      );
  };

  const dateInputs = () => {
    if (!loading)
      return (
        <Row>
          <Col>
            <FormGroup bssize="large">
              <FormLabel>Start Date</FormLabel>
              <FormControl
                name="startDate"
                type="date"
                value={startDate}
                onChange={handleStartChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup bssize="large">
              <FormLabel>End Date</FormLabel>
              <FormControl
                name="startDate"
                type="date"
                value={endDate}
                onChange={handleEndChange}
              />
            </FormGroup>
          </Col>
        </Row>
      );
  };

  const filteredSales = () => {
    if (!loading)
      return (
        <>
          <h3 className="text-center">Sale Transactions in Date Range</h3>
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
    if (!loading)
      return (
        <>
          <h3 className="text-center">Purchase Transactions in Date Range</h3>
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
    if (!loading)
      return (
        <>
          <h3 className="text-center">Restock Transactions in Date Range</h3>
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
    <div className="container ">
      <Header />
      <HeaderPadding />
      <div className="mt-3">{dateInputs()}</div>
      <div>{renderPlot()}</div>
      <div>{filteredSales()}</div>
      <div>{filteredPurchases()}</div>
      <div>{filteredRestocks()}</div>
    </div>
  );
}

export default TransactionStats;
