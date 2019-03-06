export const deleteUser = id => (
  $.ajax({
    method: 'DELETE',
    url: `api/users/${id}`
  })
);

export const createUser = (user) => (
  $.ajax({
    method: 'POST',
    url: 'api/users',
    data: user,
    contentType: false,
    processData: false
  })
);