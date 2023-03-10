// Linear recursive is O(n) time and O(n) space
// Linear iterative is O(n) time and O(1) space
// Fibonacci recursive is O(phi**n) time and O(n) space
// Fibonacci iterative is O(n) time and O(1) space

// Exercise 1.14 is an image

// Exercise 1.15
// Linear in memory
// Logarithmic in time


// Exercise 1.16
function _is_even(n) {
    return n % 2 === 0;
}

function fast_exp(b, n) {
    if (n == 0) {
        return 1;
    } else if (_is_even(n)) {
        const previous = fast_exp(b, n/2); 
        return previous * previous;
    } else {
        return fast_exp(b, n-1) * b
    }
}

// Fast exponential iterative
// Using an invariant quantity
function fast_exp_iter(b, n) {
    if (n === 0) {
        return 1;
    }
    function _fast_exp_iter(b, n, stateA, stateB) {
        // stateA * stateB**n is the invariant
        if (n === 0) {
            return stateA;
        }
        if (_is_even(n)) {
            const updatedStateA = stateA;
            const updatedStateB = stateB * stateB;
            const newN = n/2;
            
            return _fast_exp_iter(b, newN, updatedStateA, updatedStateB);
        }
        
        const updatedStateA = stateA * stateB;
        const updatedStateB = stateB;
        const newN = n-1;

        return _fast_exp_iter(b, newN, updatedStateA, updatedStateB)
    }
    
    return _fast_exp_iter(b, n, 1, b);
}


// Exercise 1.17
// Multiplying recursively
function times_rec(a, b) {
    return (
        b === 0
        ? 0
        : a + times_rec(a, b-1)
    )

}

function times_fast_rec(a, b) {
    return (
        b === 0
        ? 0
        : _is_even(b)
        ? times_fast_rec(a, b/2) + times_fast_rec(a, b/2) 
        : a + times_fast_rec(a, b-1)
    ) 
}


// Exercise 1.18


function times_iter(a, b) {
    function _times_iter(steps, cumulative) {
        if (steps == b) {
            return cumulative;
        }
        return _times_iter(steps+1, cumulative+a);
    }

    return _times_iter(0, 0)
}


// Correct this
function times_iter_fast(x, y) {
    function _times_iter_fast(x, y, stateA, stateB) {
        if (y === 0) {
            return stateA;
        } 
        if (_is_even(y)) {
            return _times_iter_fast(x, y/2, stateA, stateB + stateB)
        } else {
            return _times_iter_fast(x, y-1, stateA + stateB, stateB)
        }
    }

    return _times_iter_fast(x, y, 0, x);
}

// Exercise 1.19
// Logarithmic Fibonacci
function fib_log(n) {
    function _fib_log (a, b, p, q, count) {
        if (count === 0) {
            return b
        }
        if (_is_even(count)) {
            const newP = q*q + p*p;
            const newQ = 2*p*q + q*q;
            return _fib_log(a, b, newP, newQ, count / 2)
        }
        const newA = b*q + a*q + a*p;
        const newB = b*p + a*q;

        return _fib_log(newA, newB, p, q, count-1);
    }

    return _fib_log(1, 0, 0, 1, n) 
}