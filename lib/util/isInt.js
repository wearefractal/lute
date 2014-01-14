 module.exports = function(n) {
  n = parseInt(n);
  return typeof n === 'number' && n % 1 == 0;
};