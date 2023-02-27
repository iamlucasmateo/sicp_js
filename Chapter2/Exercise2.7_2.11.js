// Implementation of intervals and interval arithmetic
// 2.7
class Pair {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

function make_interval(x, y) {
    if (y < x) {
        throw Error("Upper bound must be larger or equal than lower bound.")
    } 
    return new Pair(x, y); 
}
function lower_bound(interval) { return interval.x }
function upper_bound(interval) { return interval.y }

function sum_interval(interval_1, interval_2) {
    return make_interval(
        lower_bound(interval_1) + lower_bound(interval_2),
        upper_bound(interval_1) + upper_bound(interval_2)
    )
}

function mul_interval(interval_1, interval_2) {
    const p1 = lower_bound(interval_1) * lower_bound(interval_2);
    const p2 = lower_bound(interval_1) * upper_bound(interval_2);
    const p3 = upper_bound(interval_1) * lower_bound(interval_2);
    const p4 = upper_bound(interval_1) * upper_bound(interval_2);

    return make_interval(
        Math.min(p1, p2, p3, p4),
        Math.max(p1, p2, p3, p4),
    )
}

function div_interval(interval_1, interval_2) {
    reciprocal_2 = make_interval(1 / upper_bound(interval_2), 1 / lower_bound(interval_2));
    
    return mul_interval(interval_1, reciprocal_2)
}

// 2.8
function substract_interval(interval_1, interval_2) {
    complement_2 = make_interval(-upper_bound(interval_2), -lower_bound(interval_2));

    return sum_interval(interval_1, complement_2)
}

// 2.9
function interval_width(interval) {
    return (upper_bound(interval) - lower_bound(interval)) / 2
}

function sum_interval_width(interval_1, interval_2) {
    return interval_width(sum_interval(interval_1, interval_2))
}

// Multiplication counterexample
let interval_1 = make_interval(0.5, 2)
interval_width(interval_1) // 0.75

let interval_2 = make_interval(-1, 3)
interval_width(interval_2) // 2


let multi_intervals_result = mul_interval(interval_1, interval_2)
interval_width(multi_intervals_result) // 4 != 2 * 0.75 = 1.5

// 2.10
function div_interval_2(interval_1, interval_2) {
    if (interval_width(interval_2) === 0) {
        throw Error("Divisor interval cannot have null width.")
    }
    reciprocal_2 = make_interval(1 / upper_bound(interval_2), 1 / lower_bound(interval_2));
    
    return mul_interval(interval_1, reciprocal_2)
}

// 2.11
// Nine cases: all possible combinatios of lower and upper bounds being positive, negative or zero.
// 3 * 3 = 9 