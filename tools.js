function _compare_statement(value, func1, func2) {
    const value1 = func1(value);
    const value2 = func2(value);
    const assesment = value1 === value2 ? "They are equal." : "They are not equal."
    const statement = `func1:  ${value1}. func2:  ${value2}. ${assesment}`
    console.log(statement)
}

function compare_funcs(value, func1, func2) {
    Array.from(Array(value)).forEach((_, index) => console.log(_compare_statement(index, func1, func2)))
}

function _statement(value, func) {
    console.log(func(value))
}

function print_func(value, func, init_value) {
    const init = init_value ? init_value : 0;
    Array.from(Array(value)).forEach((_, index) => console.log(_statement(index+init, func)))
}