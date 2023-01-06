
// Running this function will overflow the function stack
function p() { return p(); }

function test(x, y) {
    return x === 0 ? 0 : y;
}

try {
    // normal-order evaluation would reduce first (final "long expression") and then evaluate.
    // applicative-order evaluation would evaluate first then apply (thus, raising the stack overflow error). 
    const result = test(0, p());
    console.log(result);
} catch (error) {
    console.log("An error occured: ", error);
}
