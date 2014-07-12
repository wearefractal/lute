 module.exports = function(n) {
  var parsed = parseInt(n, 10);
  return typeof parsed === 'number' && !isNaN(parsed) && parsed % 1 == 0;
};
