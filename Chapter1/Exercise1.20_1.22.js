// Exercise 1.21
function smallest_divisor(n) {
    function _is_divisor(n, x) {
        return n % x === 0;
    }
    function _find_divisor(n, x) {
        return (
            x*x > n
            ? n
            : _is_divisor(n, x)
            ? x
            : _find_divisor(n, x+1)
        )
    }

    return _find_divisor(n, 2)
}

function is_prime(n) {
    return n === smallest_divisor(n);
}


// Exercise 1.22
function timed_prime_test(n) {
    console.log(n);
    return start_prime_test(n, Date.now());
}

function start_prime_test(n, start_time) {
    const isPrime = is_prime(n);
    return Date.now() - start_time;
}

function search_primes(start, howMany) {
    const start_time = Date.now();
    function _search(x, primes) {
        return (
            primes.length === howMany
            ? primes
            : is_prime(x)
            ? _search(x+1, [x, ...primes])
            : _search(x+1, primes)
        )
    }
    console.log("elapsed: ", Date.now() - start_time)
    
    return _search(start, [])
}

function prime_loop_rec(n) {
    function _prime_loop(x) {
        is_prime(x);
        return (
            x === n
            ? x
            : _prime_loop(x+1)
        )
    }
    const start_time = Date.now();
    _prime_loop(2);

    return Date.now() - start_time;
}


function prime_loop(n) {
    for (let i = 2; i < n; i++) {
        is_prime(i)
    }
}


class FunctionTimer {
    constructor(func) {
        this.func = func;
    }

    time_once = function(func_args) {
        const startTime = Date.now()
        this.func(...func_args)
        return Date.now() - startTime;
    }

    time_many = function(n, func_args) {
        const startTime = Date.now()
        for (let i = 0; i < n; i++) {
            this.func(...func_args)
        }

        return Date.now() - startTime;
    }

    time_average = function(n, func_args) {
        const total = this.time_many(n, func_args);
        return total / n;
    }

    time_with_changing_args = function(n, func_args_map) {
        const data = {}
        for (let key in func_args_map) {
            let func_args = func_args_map[key];
            data[key] = this.time_average(n, func_args)
        }

        return data;
    }
}
