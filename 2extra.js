const convert_ip = num => {
    const bin = num.toString(2).split('')
    let array = []
    let res = [0,0,0,0]
    for(let i = 0; i < 32 - bin.length; i++){
        array.push('0')
    }
    array = array.concat(bin)
    for(let i = 0; i < 32; i++){
        res[Math.floor(i/8)] += Math.pow(2, 7-i%8)*parseInt(array[i])
    }
    return res.join('.')
}

console.log("2149583361", convert_ip(2149583361))
console.log("32", convert_ip(32))
console.log("0", convert_ip(0))
