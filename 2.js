const first_non_repeating_letter = word => word.split('')
.reduce((result, x) => 
word.indexOf(x) === word.lastIndexOf(x) 
&& (word.indexOf(x.toLowerCase()) === -1 || word.indexOf(x.toUpperCase()) === -1)
&& result === '' ? result = x : result, '')

console.log('"RrttFF"', `"${first_non_repeating_letter('RrttFF')}"`)
console.log('"sTreSS"', `"${first_non_repeating_letter('sTreSS')}"`)
console.log('"ConcOliDaTe"', `"${first_non_repeating_letter('ConcOliDaTe')}"`)