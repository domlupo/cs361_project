const getSales = (transactions) => {
  return transactions.filter((t) => t.endLoc === 'sold');
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

  const incomeByDay = [];
  Object.keys(holder).forEach((key, index) => {
    incomeByDay.push({ date: key, income: holder[key] });
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
};
