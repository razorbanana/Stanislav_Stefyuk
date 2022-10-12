const filter_list = list => list.filter(x => typeof x !== 'string')

console.log("[1,2,'a','b'] -",filter_list([1,2,'a','b']))
console.log("[1,'a','b',0,15] -",filter_list([1,'a','b',0,15]))
console.log("[1,2,'aasf','1','123',123] -",filter_list([1,2,'aasf','1','123',123]))