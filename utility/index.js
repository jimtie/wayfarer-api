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

function handleError(error, res) {
  console.log('----------');
  console.log(error);
  console.log('----------');

  res.status(err.number).json({
    status: err.number,
    message: err.message,
  });
}

function clientUser(user){
  return {
    id: user._id,
    name: user.name,
    city: {
      id: user.city._id,
      name: user.city.name,
    },
    joinDate: user.createdAt,
  }
}

module.exports = {
  throw4xx,
  throwAuthError,
  handleError,
  clientUser
}
