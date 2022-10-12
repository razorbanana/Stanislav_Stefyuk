const count_pairs = (array, target) => 
array.reduce((result, x) => result += array.reduce((res,y) => res += x+y === target,0) - (target === x*2), 0)/2

console.log("array: [1, 3, 6, 2, 2, 0, 4, 5], target: 4 =>", count_pairs([1, 3, 6, 2, 2, 0, 4, 5], 4))
console.log("array: [1, 3, 6, 2, 2, 0, 4, 5], target: 5 =>", count_pairs([1, 3, 6, 2, 2, 0, 4, 5], 5))
console.log("array: [1, 3, 6, 2, 2, 0, 4, 5], target: 8 =>", count_pairs([1, 3, 6, 2, 2, 0, 4, 5], 8))