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

function sum_between_rec(term, a, b, next) {
    return (
        a > b
        ? 0
        : term(a) + sum_between_rec(term, next(a), b, next)
    )
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


// Exercise 1.32
function accumulate_rec(combiner, null_value, term, a, next, b) {
    return (
        a > b
        ? null_value
        : combiner(term(a), accumulate_rec(combiner, null_value, term, next(a), next, b))
    )
}

function sum_accum_rec(term, a, next, b) {
    function _sum_term(x, y) {
        return x + y;
    }
    return accumulate_rec(_sum_term, 0, term, a, next, b)
}

function product_accum_rec(term, a, next, b) {
    function _product_term(x, y) {
        return x * y;
    }
    return accumulate_rec(_product_term, 1, term, a, next, b)
}

function accumulate_iter(combiner, null_value, term, a, next, b) {
    function _iter(accumulated, current_a) {
        return (
            current_a > b
            ? accumulated
            : _iter(combiner(accumulated, term(current_a)), next(current_a))
        )
    }

    return _iter(null_value, a)
}


// Exercise 1.33
function accumulate_filter_iter(combiner, filter, null_value, term, a, next, b) {
    function _iter(accumulated, current_a) {
        return (
            current_a > b
            ? accumulated
            : filter(current_a)
            ? _iter(combiner(accumulated, term(current_a)), next(current_a))
            : _iter(accumulated, next(current_a))
        )
    }

    return _iter(null_value, a)
}

function accumulate_filter_rec(combiner, filter, null_value, term, a, next, b) {
    return (
        a > b
        ? null_value
        : filter(a)
        ? combiner(term(a), accumulate_filter_rec(combiner, filter, null_value, term, next(a), next, b))
        : combiner(null_value, accumulate_filter_rec(combiner, filter, null_value, next(a), b))
    )
}


// 1.33.a
function sum_squares_primes_between(a, b, strategy="iter") {
    
    function _sum_term(x, y) {
        return x + y;
        
    }
    
    function _is_prime(n, divisor = 2) {        
        function _is_divisible(x, y) {
            return x % y === 0;
        }
        return (
            divisor * divisor > n 
            ? true
            : _is_divisible(n, divisor)
            ? false
            : _is_prime(n, divisor + 1)
        )
    }

    let strategy_function = null;
    
    if (strategy === "iter") {
        strategy_function = accumulate_filter_iter;
    } else {
        strategy_function = accumulate_filter_rec;
    }


    return strategy_function(_sum_term, _is_prime, 0, x => x*x, a, x => x + 1, b);
}

