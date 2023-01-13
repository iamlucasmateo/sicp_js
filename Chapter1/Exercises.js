// Ex 1.2
const expression = (5 + 4 + (2 - (3 - (6 + 4/5)))) / (3 * (6 - 2) * (2 - 7))


// Ex 1.3

// Function that takes three numbers, returns the sum of the squares of the two largest

function exercise3(number1, number2, number3) {
    const largestNumber = Math.max(number1, number2, number3);
    const indexToRemove = [number1, number2, number3].indexOf(largestNumber);
    const reducedArray = [number1, number2, number3]
    reducedArray.splice(indexToRemove, 1);
    const secondLargestNumber = Math.max(...reducedArray);

    return square(largestNumber) + square(secondLargestNumber); 
}

function square(number) {
    return number * number;
}


// Ex 1.4

// The "model of evaluation" allows for function expressions to be compound expressions, e.g.:
function plus(a, b) { return a + b};
function minus(a, b) { return a - b };
function a_plus_abs_b(a, b) {
    return (b >= 0 ? plus : minus)(a, b)
}

// I would declare that beforehand for readability:

function a_plus_abs_b_readable(a, b) {
    const applicableFunction = (b >= 0 ? plus : minus); 
    return applicableFunction(a, b)
}


// Ex 1.5
// applicative-order vs normal-order

// Running this function will overflow the function stack
function p() { return p(); }

function test(x, y) {
    return x === 0 ? 0 : y;
}

function exercise5() {
    try {
        // normal-order evaluation would reduce first (final "long expression") and then evaluate.
        // applicative-order evaluation would evaluate first then apply (thus, raising the stack overflow error). 
        const result = test(0, p());
        console.log(result);
    } catch (error) {
        console.log("An error occured: ", error);
    }
}


