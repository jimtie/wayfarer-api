// Utility Functions

const httpErrors = {
  400: Error('Bad Request'),
  401: Error('Unauthorized'),
  403: Error('Forbidden'),
  404: Error('Not Found'),
}

// Error Utilities
function throw4xx(status){
  err = httpErrors[status];
  err.number = status;
  throw err;
}

function throwAuthError(){
  throw4xx(401);
}

function handleError(err, res) {
  console.log('----------');
  console.log(err);
  console.log('----------');

  res.status(err.number).json({
    status: err.number,
    message: err.message,
  });
}

function clientUser(user){
  let clientUser = {
    id: user._id,
    name: user.name,
    city: {
      id: -1,
      name: 'not yet selected',
    },
    joinDate: user.createdAt,
    posts: user.post,
  }

  if (user.city){
    clientUser.city = {
      id: user.city._id,
      name: user.city.name,
    }
  }

  return clientUser;
}

module.exports = {
  throw4xx,
  throwAuthError,
  handleError,
  clientUser
}
