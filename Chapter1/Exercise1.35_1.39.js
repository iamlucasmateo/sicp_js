function fixed_point(f, guess=0, tolerance=0.00001, average_damping=true, steps=1) {
    if (Math.abs(f(guess) - guess) < tolerance) {
        console.log("TOTAL STEPS", steps);
        return guess;
    }
    let newGuess = f(guess);
    if (average_damping) {
        newGuess = (newGuess + guess) / 2;
    }
    
    return fixed_point(f, newGuess, tolerance, average_damping, steps=steps+1);
}

// Exercise 1.35
function compute_phi() {
    return fixed_point(x => 1 + 1/x, 1);
}



// Exercise 1.36
// Root of x**x = 1000;
function compute_root() {
    return fixed_point(x => Math.log(1000) / Math.log(x), guess=1.2);
}


// Exercise 1.37
function cont_frac(N, D, steps_limit, current_steps=1) {
    return (
        current_steps === steps_limit
        ? N(current_steps) / D(current_steps)
        : N(current_steps) / (D(current_steps) + cont_frac(N, D, steps_limit, current_steps+1))
    )
}


function compute_phi_expansion(steps) {
    return 1 / cont_frac(x => 1, x => 1, steps);
}

// Exercise 1.38
function euler_denom(i) {
    // 1, 2, 1, 1, 4, 1, 1, 6, 1, 1, 8, 1, ...
    return (
        ((i - 2) % 3 === 0)
        ? 2 * ((i - 2) / 3) + 2
        : 1
    )
}

function compute_euler_e(steps) {
    return cont_frac(x => 1, euler_denom, steps) + 2;
}



// Exercise 1.39
function tan_cf(x, k) {
    function _num(i) {
        return (
            i === 1
            ? x
            : -(x*x)
        )
    }
    
    function _den(i) {
        return i * 2 - 1;
    }

    return cont_frac(_num, _den, k)
}


// Newton's formula
function derivative(f, dx=0.00001) {
    return x => (f(x+dx) - f(x)) / dx;
}

function newton_formula(f) {
    return x => x - f(x) / derivative(f)(x);
}

function newtons_method(f, guess=1) {
    return fixed_point(newton_formula(f), guess)
}

function newton_sqrt(x, guess=1) {
    return newtons_method(y => y*y - x, guess);
}


// Exercise 1.40
function cubic(a, b, c) {
    return x => x*x*x + a*x*x + b*x + c;
}

function newton_cubic_root(a, b, c) {
    return newtons_method(cubic(a, b, c))
}

// Exercise 1.41
function repeat_apply(f, n) {
    function _iter(accumulated, steps=1) {
        return (
            steps === n
            ? f(accumulated)
            : _iter(f(accumulated), steps+1)
        )
    }
    return x => _iter(x);
}

function double(f) {
    return repeat_apply(f, 2)
}

function inc(x) {
    return x + 1;
}


// Exercise 1.42
function compose(f, g) {
    return x => f(g(x));
}


// Exercise 1.44
function smoothed(f, dx=0.0001) {
    return x => (f(x-dx) + f(x) + f(x+dx)) / 3;
}

function repeat_smooth(n, dx=0.0001) {
    const smoothed_partial = f => smoothed(f, dx=dx)
    return repeat_apply(smoothed_partial, n)
}

