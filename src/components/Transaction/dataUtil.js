const getSales = (transactions) => {
  return transactions.filter((t) => t.endLoc === 'sold');
};

const getPurchases = (transactions) => {
  return transactions.filter((t) => t.endLoc === 'inventory');
};

const getRestocks = (transactions) => {
  return transactions.filter((t) => t.endLoc === 'shelf');
};

const filterByDate = (transactions, startDate, endDate) => {
  return transactions.filter((t) => {
    return (
      new Date(t.date) > new Date(startDate) &&
      new Date(t.date) <= new Date(endDate)
    );
  });
};

const getSalesInRange = (transactions, startDate, endDate) => {
  return filterByDate(getSales(transactions), startDate, endDate);
};

const getPurchasesInRange = (transactions, startDate, endDate) => {
  return filterByDate(getPurchases(transactions), startDate, endDate);
};

const getRestocksInRange = (transactions, startDate, endDate) => {
  return filterByDate(getRestocks(transactions), startDate, endDate);
};

const getNetIncome = (sale) => {
  return sale.price * sale.productQty;
};

const addSimpleDate = (transactions) => {
  transactions.forEach((transaction) => {
    transaction.simpleDate = transaction.date.substring(0, 10);
  });
};

const getSimpleDate = (transaction) => {
  return transaction.date.substring(0, 10);
};

const getIncomeByDay = (sales) => {
  const holder = {};
  sales.forEach((sale) => {
    const day = getSimpleDate(sale);
    if (day in holder) {
      holder[day] += getNetIncome(sale);
    } else {
      holder[day] = getNetIncome(sale);
    }
  });

  const dates = [];

  Object.keys(holder).forEach((key) => {
    dates.push(key);
  });

  dates.sort();
  const incomeByDay = [];

  dates.forEach((date) => {
    incomeByDay.push({ date, income: holder[date] });
  });

  return incomeByDay;
};

module.exports = {
  getSales,
  filterByDate,
  getSalesInRange,
  getNetIncome,
  addSimpleDate,
  getIncomeByDay,
  getPurchases,
  getRestocks,
  getPurchasesInRange,
  getRestocksInRange,
};
