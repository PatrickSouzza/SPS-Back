function success(data, message = null) {
    return {
      success: true,
      data,
      message
    };
  }
  
  function error(message) {
    return {
      success: false,
      data: null,
      message
    };
  }
  
  module.exports = {
    success,
    error
  };
  