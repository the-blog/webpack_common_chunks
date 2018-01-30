const ClassicModule = function () {
  const sum = function(a, b) {
    return sum_method(a, b)
  }

  const sum_method = (a, b) => {
    return a + b
  }

  return {
    sum: sum
  }
}

module.exports = ClassicModule
