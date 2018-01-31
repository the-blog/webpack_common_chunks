const sum = function(a, b) {
  console.log('sum')
  return sum_method(a, b)
}

const sum_method = (a, b) => {
  return a + b
}

module.exports = sum
