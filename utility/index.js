// Utility Functions

// Error Utilities
function throwAuthError(){
  let authError = new Error('Unauthorized');
  authError.name='NoAuth';
  throw authError;
}

function handleError(error, res) {
  console.log('----------');
  console.log(error);
  console.log('----------');

  if (error.name = 'NoAuth'){
    res.status(403).json({
      status: 403,
      error: 'Unauthorized',
    });
  }
  else {
    res.status(500).json({
      status: 500,
      error: 'Internal Server Error'
    })
  }
}

module.exports = {
  throwAuthError,
  handleError,
}
