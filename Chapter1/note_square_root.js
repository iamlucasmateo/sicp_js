// Implement square root algorithm
// Newton's method: new_guess = (guess + number/guess) / 2


function square_root(number, threshold) {
    if (!threshold) {
        const RELATIVE_THRESHOLD = 0.000000001;
        threshold = number * RELATIVE_THRESHOLD;
    }
    let guess = number / 2;
    while (!isGoodEnough(guess, number, threshold)) {
        guess = (guess + number / guess) / 2;
    }

    return guess;
}

function isGoodEnough(guess, number, threshold) {
    const absoluteDifference = Math.abs((square(guess) - number));
    
    return absoluteDifference < threshold
}

function square(number) {
    return number * number;
}