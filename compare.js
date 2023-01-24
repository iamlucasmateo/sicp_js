function _statement(value, func1, func2) {
    const statement = `func1:  ${func1(value)}. func2:  ${func2(value)}. `
    console.log(statement)
}

function compare_funcs(value, func1, func2) {
    Array.from(Array(value)).forEach((_, index) => console.log(_statement(index, func1, func2)))
}