// Fibonacci as a tree-recursive algorithm
function fib_rec(n) {
    return (
        n === 0
        ? 0
        : n === 1
        ? 1
        : fib_rec(n-1) + fib_rec(n-2)
    )
}

// This uses linear space and exponential time, with the golden ratio (aprox. 1.618) as the base of the exponent
// O(n) = 1.618**n
// golden ratio = phi
// phi**2 = phi + 1
// phi = (1 + sqrt(5))/2


// Fibonacci iterative
function fib_iter(n) {
    function _fib_iter(a, b, steps) {
        return (
            steps === n
            ? a
            : _fib_iter(b, a+b, steps+1)
        )
    }
    
    return (
        [0, 1].includes(n)
        ? n
        : _fib_iter(0, 1, 0)
    )
}

function _statement(n) {
    return `Number: ${n}. Recursive: ${fib_rec(n)}. Iterative: ${fib_iter(n)}`;
    
}

function check_print() {
    Array.from(Array(10)).forEach((_, index) => console.log(_statement(index)))
}


// Counting change
function change(amount) {
    function _change(amount, coinType) {
        return (
            _closeEnough(amount, 0)
            ? 1
            : _closeEnough(coinType, 0)
            ? 0
            : amount < 0
            ? 0
            : _change(amount, coinType - 1) 
            + _change(amount - coinMap[coinType], coinType)
        )
    }

    function _closeEnough(value1, value2) {
        return Math.abs(value1, value2) < 0.0001
    }

    coinMap = {
        5: 0.5,
        4: 0.25,
        3: 0.1,
        2: 0.05,
        1: 0.01,
        0: 0
    }

    let startCoin = 5;
    
    for (let i = 0; i < 6; i++) {
        if (coinMap[i] > amount) {
            startCoin = i - 1;
            break
        }
    }

    return _change(amount, startCoin)
}


// Tabulation/memoization
// For Fibonacci tree-recursive
const remember = {};
function fib_rec_tabulated(n) {
    if (Object.keys(remember).includes(n)) {
        return remember[n]
    }
    let value = (
        n === 0
        ? 0
        : n === 1
        ? 1
        : fib_rec_tabulated(n-1) + fib_rec_tabulated(n-2)
    )
    remember[n] = value;
    
    return value;
}