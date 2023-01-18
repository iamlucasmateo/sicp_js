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
function change() {
    function _change()
}


// Tabulation/memoization
// For Fibonacci tree-recursive