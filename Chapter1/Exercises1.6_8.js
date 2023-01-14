// Some notes on square roots
// Implement square root algorithm
// Newton's method: new_guess = (guess + number/guess) / 2


function square_root_while(number, threshold) {
    if (!threshold) {
        const RELATIVE_THRESHOLD = 0.000000001;
        threshold = number * RELATIVE_THRESHOLD;
    }
    let guess = number / 2;
    while (!isGoodEnough(guess, number, threshold)) {
        guess = update_guess(guess, number);
    }

    return guess;
}

function square_root_iter(number, threshold) {
    if (!threshold) {
        const RELATIVE_THRESHOLD = 0.000000001;
        threshold = number * RELATIVE_THRESHOLD;
    }
    
    function square_root_guess(number, guess, threshold) {
        return (
            isGoodEnough(guess, number, threshold)
            ? guess
            : square_root_guess(number, update_guess(guess, number), threshold)
        )
    }

    return square_root_guess(number, number / 2, threshold);
}

function update_guess(guess, number) {
    return (guess + number / guess) / 2;
}

function isGoodEnough(guess, number, threshold) {
    const absoluteDifference = Math.abs((square(guess) - number));
    
    return absoluteDifference < threshold
}

function square(number) {
    return number * number;
}



// Ex 1.6

function conditional_function(condition, ifTrue, ifFalse) {
    return condition ? ifTrue : ifFalse;  
}

function square_root_ok(number) {
    function square_root_iter(number, guess) {
        return (
            Math.abs(guess**2 - number) < 0.0000001
            ? guess
            : square_root_iter(number, (guess+(number/guess)) / 2)
        )
    }

    return square_root_iter(number, number / 2)
}

function square_root_problematic(number) {
    function square_root_iter(number, guess) {
        return conditional_function(
            Math.abs(guess**2 - number) < 0.000001,
            guess,
            square_root_iter(number, (guess+(number/guess)) / 2)
        )
    }

    return square_root_iter(number, number / 2)
}

function exercise6() {
    try {
        square_root_ok(2);
        console.log("Works fine, get short circuited")
    } catch {

    }

    try {
        square_root_problematic(2);
    } catch (error) {
        console.log("Error: infinite loop")
        console.log(error);
    }
}


// Ex 1.7
// e.g.: works really bad with square_root_iter(0.0004, 0.001) (threshold = 0.001)

// this handles it much better

function square_root_alternative(number, threshold) {
    function isCloseEnough(number1, number2) {
        return Math.abs(number1 - number2) < threshold;
    }

    function square_root_iter(guess, previousGuess) {
        return (
            isCloseEnough(guess, previousGuess)
            ? guess
            : square_root_iter((guess+(number/guess))/2, guess)
        )
    }

    return square_root_iter(number, number / 2, number / 2 - 1, threshold)
}


// Ex 1.8
// Making use of lexical scoping too

function cubic_root_1(number, threshold) {
    function isCloseEnough(number1, number2) {
        return Math.abs(number1 - number2) < threshold
    }

    function improve(guess) {
        return ((number/(guess**2)) + (2*guess)) / 3; 
    }

    function cubic_root_iter(guess, previousGuess) {
        return (
            isCloseEnough(guess, previousGuess)
            ? guess
            : cubic_root_iter(improve(guess), guess)
        )
    }

    return cubic_root_iter(number/2, number/2-1);
}

function cubic_root_2(number, threshold) {
    function isGoodEnough(guess) {
        return Math.abs(guess**3 - number) < threshold;
    }

    function improve(guess) {
        return ((number/(guess**2)) + (2*guess)) / 3; 
    }

    function cubic_root_iter(guess) {
        return (
            isGoodEnough(guess)
            ? guess
            : cubic_root_iter(improve(guess))
        )
    }

    return cubic_root_iter(number/2);
}