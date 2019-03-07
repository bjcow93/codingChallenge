export const fetchCustomer = (id, month) => {
  return $.ajax({
      method: 'GET',
      url: `api/customers/${id}`,
      data: {
        month: month ? month : '2019-01'
      }
    });
  };