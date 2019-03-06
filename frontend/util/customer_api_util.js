export const fetchCustomer = id => (
  $.ajax({
    method: 'GET',
    url: `api/customers/${id}`
  })
);