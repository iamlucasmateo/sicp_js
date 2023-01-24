// Exercise 1.11
function exercise_11_recursive(n) {
    return (
        n < 3
        ? n
        : exercise_11(n-1) + 2 * exercise_11(n-2) + 3 * exercise_11(n-3)
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

    return _excercise_1_state(0)

}