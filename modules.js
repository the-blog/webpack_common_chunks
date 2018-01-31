// This way DOES NOT supports `constructor`, `instanceof`
// Works only `new myModule`, `myModule()`
// This is Module Pattern
// Function produces an object
// Only specified methods in the return statement are public

// function myModule () {
//   const sum = function (a, b) {
//     console.log('Sum fu')
//     console.log(this)
//     return sum_method(a, b)
//   }
//
//   const sum_method = function (a, b) {
//     console.log('Sum Method fu')
//     return a + b
//   }
//
//   return {
//     sum: sum
//   }
// }

// This way supports `constructor`, `instanceof`
// Works only for `new myModule`
// Function is a constructor method
// All methods are public
function myModule () {
  this.sum = function (a, b) {
    console.log('Sum fu')
    console.log(this)
    return this.sum_method(a, b)
  }

  this.sum_method = function (a, b) {
    console.log('Sum Method fu')
    return a + b
  }
}

// console.log('----------------------------')
// a1 = myModule()
// console.log( a1.sum(1, 2) )
// console.log( a1.constructor == myModule )
// console.log( a1 instanceof myModule )
// console.log( a1.prototype )

console.log('----------------------------')
a2 = new myModule
console.log( a2.sum(1, 2) )
console.log( a2.sum_method(1, 2) )
console.log( a2.constructor == myModule )
console.log( a2 instanceof myModule )
console.log( a2.prototype )
console.log('----------------------------')
