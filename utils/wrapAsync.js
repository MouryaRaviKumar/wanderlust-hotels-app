// Utility function to wrap async route handlers and forward errors to Express
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
