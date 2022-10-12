const digital_root = num => num.toString().split('').reduce((result, digit) => result += parseInt(digit), 0) > 9
    ? digital_root(num.toString().split('').reduce((result, digit) => result += parseInt(digit), 0))
    : num.toString().split('').reduce((result, digit) => result += parseInt(digit), 0)

console.log('16', digital_root(16))
console.log('942', digital_root(942))
console.log('132189', digital_root(132189))
console.log('493193', digital_root(493193))