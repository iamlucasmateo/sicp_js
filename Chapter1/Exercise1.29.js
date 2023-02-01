// sum between
function sum_between(term, a, b, next, introspect=false) {
    if (a > b) {
        return 0;
    }
    const calculatedTerm = term(a);
    const nextA = next(a);
    if (introspect) {
        console.log(`a: ${a}. nextA: ${nextA}. calculatedTerm: ${calculatedTerm}`);
    }
    
    return calculatedTerm + sum_between(term, nextA, b, next, introspect);
}


// Exercise 1.29
function _is_even(n) {
    return Math.abs((n % 2) - 0) < 0.001;

}


function simpson_integral(f, a, b, n, sum_func=sum_between, introspect=false) {
    const h = (b - a) / n;
    function next(current) {
        return current + h;
    }
    
    function term(current_a) {
        const steps = Math.round((current_a - a) / h);
        const multiplier = [0, n].includes(steps) ? 1 : _is_even(steps) ? 2 : 4;
        const result = multiplier * f(current_a);
        
        if (this.introspect) {
            console.log(`steps: ${steps}. multiplier: ${multiplier}. current_a: ${current_a}`)
        }
        
        return result;
    }
    return (h/3) * sum_func(term, a, b, next, introspect)


}


// Exercise 1.30
// Sum between a and b, iterative
function sum_between_iter(term, a, b, next) {
    function _iter(current, accumulated) {
        return (
            current > b 
            ? accumulated
            : _iter(next(current), accumulated + term(current))
        )
    }

    return _iter(a, 0)
}


// Exercise 1.31
// Product higher order function
function product_between_rec(term, a, b, next) {
    return (
        a > b
        ? 1
        : term(a) * product_between_rec(term, next(a), b, next)
    )
}

function product_between_iter(term, a, b, next) {
    function _iter(current, accumulated) {
        return (
            current > b
            ? accumulated
            : _iter(next(current), accumulated * term(current))
        )
    }

    return _iter(a, 1)
}

function pi_next(index) {
    return index + 1;
}

function pi_term(index) {
    const numerator = (2 * index) * (2 * index + 2);
    const denominator = (2 * index + 1) * (2 * index + 1);
    
    return numerator / denominator;
}