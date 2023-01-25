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
function fast_exp_iter(b, n) {
    if (n === 0) {
        return 1;
    }
    function _fast_exp_iter(b, n, steps, cumulative) {
        if (!_is_even(n)) {
            return fast_exp_iter(b, n-1) * b;
        }
        const updatedSteps = steps * 2;
        const updatedCumulative = cumulative * cumulative;
        if (updatedSteps == n) {
            return cumulative;
        }
        if (updatedSteps * 2 > n) {
            const remaining = n - updatedSteps;
            return cumulative * _fast_exp_iter(b, remaining, 1, b*b);
        }
        
        return _fast_exp_iter(b, n, updatedSteps, updatedCumulative);
    }
    
    return _fast_exp_iter(b, n, 1, b*b);
}


// Exercise 1.17
function times_rec(a, b) {
    return (
        b === 1
        ? a
        : a + times_rec(a, b-1)
    )

}

function times_fast_rec(a, b) {

}


function times_iter(a, b) {
    function _times_iter(steps, cumulative) {
        if (steps == b) {
            return cumulative;
        }
        return _times_iter(steps+1, cumulative+a);
    }

    return _times_iter(0, 0)
}