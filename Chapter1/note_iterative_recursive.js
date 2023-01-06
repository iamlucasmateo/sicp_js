/*
* Examples of iterative processes using recursive functions
*/

// Print each element in an array
function print_elements(array, recursive = true) {
    return recursive ? print_elements_recursive(array) : print_elements_iterative(array);
}

function print_elements_iterative(array) {
    for (item of array) {
        console.log(item);
    }
}

function print_elements_recursive(array) {
    function print_elements_recursive_iter(array, i) {
        console.log(array[i]);
        i < (array.length - 1) ? print_elements_recursive_iter(array, i+1) : null; 
    }

    print_elements_recursive_iter(array, 0)
}

console.log("Print array with a for loop");
print_elements([1, 2, 3, 4]);
console.log("\nPrint array iteratively with a recursive function");
print_elements([1, 2, 3, 4], recursive=true);


// Functional programming: filter
function filter_array(array, condition) {
    function filter_array_iter(filtered_array, index) {
        if (condition(array[index])) {
            filtered_array.push(array[index])
        };
        return index < array.length - 1 ? filter_array_iter(filtered_array, index + 1) : filtered_array;
    }

    return filter_array_iter([], 0);
};

eg_array = [12, 35, 74, 23, 67, 457, 234, 678, 93, 89, 73, 56]

function is_even(number) {
    return number % 2 === 0;
}
console.log("\nFunctional: iterative filter with recursive function")
console.log(filter_array(eg_array, is_even));


// Functional programming: map
const map_array = (array, transformation) => {
    const map_array_iter = (new_array, index) => {
        new_array.push(transformation(array[index]));
        return index < array.length - 1 ? map_array_iter(new_array, index + 1) : new_array;
    }

    return map_array_iter([], 0);
}

console.log("\nFunctional: iterative map with recursive function")
console.log(map_array(filter_array(eg_array, is_even), x => x / 2));