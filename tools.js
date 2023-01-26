class FunctionChecker {
    constructor(func) {
        this.func = func;
    }
    
    #statement = (parameters) => {
        console.log(this.func(...parameters))
    }
    
    print(size, func_args) {
        const emptyArray =  Array.from(Array(size));
        emptyArray.forEach((_, index) => this.#statement([...func_args, index]));
    }
}


class Comparator {
    constructor(func1, func2) {
        this.func1 = func1;
        this.func2 = func2;
    }

    #compare_statement = (parameters) => {
        const value1 = this.func1(...parameters);
        const value2 = this.func2(...parameters);
        const assesment = value1 === value2 ? "They are equal." : "They are not equal."
        const statement = `func1:  ${value1}. func2:  ${value2}. ${assesment}`
        console.log(statement)
    }
    
    
    compare(size, func_args) {
        if (!func_args) {
            func_args = [];
        }
        const emptyArray = Array.from(Array(size));
        emptyArray.forEach((_, index) => this.#compare_statement([...func_args, index]));
    }
}