const nextBigger = num => num.toString().split('').reverse()
.reduce((res,x) => res.flag && x < res.array[res.array.length-1] 
? {array:res.array.slice(0,res.array.length-1).concat(x).concat(res.array.pop()), flag: 0}
: {array:res.array.concat(x),flag: res.flag}, {array:[],flag: 1})
.flag ? -1 
: parseInt(num.toString().split('').reverse()
.reduce((res,x) => res.flag && x < res.array[res.array.length-1] 
? {array:res.array.slice(0,res.array.length-1).concat(x).concat(res.array.pop()), flag: 0}
: {array:res.array.concat(x),flag: res.flag}, {array:[],flag: 1})
.array.reverse().join(''))

console.log("12", nextBigger(12))
console.log("513", nextBigger(513))
console.log("2017", nextBigger(2017))
console.log("9", nextBigger(9))
console.log("111", nextBigger(111))
console.log("531", nextBigger(531))