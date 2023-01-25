// Exercise 1.11
// f(n) = f(n-1) + 2*f(n-2) + 3*f(n-3)

function exercise_11_recursive(n) {
    return (
        n < 3
        ? n
        : exercise_11_recursive(n-1) + 2 * exercise_11_recursive(n-2) + 3 * exercise_11_recursive(n-3)
    )
}



function exercise_11_iterative(n) {
    function _excercise_1_state(steps, cumulative, value_n_2, value_n_3) {
        if (n < 3) {
            return n;
        }
        if (steps === n) {
            return cumulative
        }
        const newSteps = steps + 1;
        const newValue_n_2 = cumulative;
        const newValue_n_3 = value_n_2;
        const newCumulative = cumulative + 2 * value_n_2 + 3 * value_n_3;

        return _excercise_1_state(newSteps, newCumulative, newValue_n_2, newValue_n_3)
    }

    const valueFor0 = 0
    const valueFor1 = 1
    const valueFor2 = 2
    const valueFor3 = valueFor2 + 2 * valueFor1 + 3 * valueFor0

    return _excercise_1_state(3, valueFor3, valueFor2, valueFor1)

}



// Exercise 11.12
// Pascal's triangle

function getPascalValueFromPrevious(previous) {
    const size = previous.length + 1;
    const getValue = (_, index) => {
        return (
            index === 0 || index === (size - 1)
            ? 1
            : previous[index-1] + previous[index]
        )
    }
    
    return Array.from(Array(size)).map(getValue)

}


function pascal_recursive(row) {
    if (row < 1) throw new Error("Should be >= 1")
    if (row === 1) return [1]
    const previous = pascal_recursive(row - 1);

    return getPascalValueFromPrevious(previous);
}



function pascal_iterative(row) {
    if (row < 1) throw new Error("Should be >= 1")
    if (row === 1) return [1]
    function _pascal_iterative(steps, previousRow) {
        let returnValue = previousRow;
        if (steps <= row) {
            const updatedRow = getPascalValueFromPrevious(previousRow);
            returnValue = _pascal_iterative(steps+1, updatedRow);
        }

        return returnValue;

    }

    return _pascal_iterative(1, [1])
}