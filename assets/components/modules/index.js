const classicModule = require('./classic.js')

console.warn(classicModule)
console.warn(classicModule())
console.warn(new classicModule)

const myModuleFu = classicModule()
const myModuleNew = new classicModule

console.warn(myModuleFu.sum(1, 2))
console.warn(myModuleNew.sum(1, 2))
