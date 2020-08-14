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

const getNetIncome = (sale) => {
  return sale.price * sale.productQty;
};
