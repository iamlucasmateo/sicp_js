function _statement(value, func1, func2) {
    const value1 = func1(value);
    const value2 = func2(value);
    const assesment = value1 === value2 ? "They are equal." : "They are not equal."
    const statement = `func1:  ${value1}. func2:  ${value2}. ${assesment}`
    console.log(statement)
}

function compare_funcs(value, func1, func2) {
    Array.from(Array(value)).forEach((_, index) => console.log(_statement(index, func1, func2)))
}