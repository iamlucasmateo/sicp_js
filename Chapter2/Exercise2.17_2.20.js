// Lists
class Pair {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

function pair(x, y) {
    return new Pair(x, y);
}

function head(my_pair) {
    return my_pair.x;
}

function tail(my_pair) {
    return my_pair.y;
}

function make_list(...args) {
    return (
        args.length === 1
        ? pair(args[0], null)
        : extend(pair(args[0], null), make_list(...args.slice(1)))
    )

}

const one_through_four = pair(1, pair(2, pair(3, pair(4, null))));

function add_head(head, list) {
    return pair(head, list);
}

function append(list, value) {
    return (
        tail(list) === null
        ? pair(head(list), pair(value, null))
        : pair(head(list), append(tail(list), value))
    );
}

function find_index(list, i) {
    return (
        i  === 0
        ? head(list)
        : find_index(tail(list), i - 1)
    )
}

function find_index_iter(list, i) {
    function _iter(current_list, current_i) {
        return (
            current_i === i
            ? head(current_list)
            : _iter(tail(current_list), current_i + 1)
        )
    }

    return _iter(list, 0);
}

function length(list) {
    return (
        tail(list) === null
        ? 1
        : 1 + length(tail(list))
    )
}

function length_iter(list) {
    function _iter(current_list, length) {
        return (
            tail(current_list) === null
            ? length + 1
            : _iter(tail(current_list), length + 1)
        )
    }

    return _iter(list, 0);
}

function extend(list1, list2) {
    return (
        tail(list2) === null
        ? append(list1, head(list2))
        : extend(append(list1, head(list2)), tail(list2))
    )
}


// 2.17
function last_pair(list) {
    return (
        tail(list) === null
        ? list
        : last_pair(tail(list))
    )
}

// 2.18
function reverse(list) {
    return (
        tail(list) === null
        ? list
        : tail(tail(list)) === null
        ? pair(head(tail(list)), pair(head(list), null))
        : append(reverse(tail(list)), head(list))
    )
}


// 2.20
// Haskell Brooks Curry
function plus_curried(x) {
    return y => x + y;
}

// e.g. plus_curried(3)(4) = 3 + 4
function brooks(function_to_curry, arguments) {
    return (
        tail(arguments) === null
        ? function_to_curry(head(arguments))
        : brooks(function_to_curry(head(arguments)), tail(arguments))
    )
}

function brooks_curried_1(function_to_curry) {
    return arguments => function_to_curry(arguments)
}