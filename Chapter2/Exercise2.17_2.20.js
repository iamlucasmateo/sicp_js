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

function is_null(value) {
    return value === null;
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
        is_null(tail(list))
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
        is_null(tail(list))
        ? 1
        : 1 + length(tail(list))
    )
}

function length_iter(list) {
    function _iter(current_list, length) {
        return (
            is_null(tail(current_list))
            ? length + 1
            : _iter(tail(current_list), length + 1)
        )
    }

    return _iter(list, 0);
}

function extend(list1, list2) {
    return (
        is_null(tail(list2))
        ? append(list1, head(list2))
        : extend(append(list1, head(list2)), tail(list2))
    )
}


// 2.17
function last_pair(list) {
    return (
        is_null(tail(list))
        ? list
        : last_pair(tail(list))
    )
}

// 2.18
function reverse(list) {
    return (
        is_null(tail(list))
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
        is_null(tail(arguments))
        ? function_to_curry(head(arguments))
        : tail(tail(arguments)) === null
        ? function_to_curry(head(arguments))(head(tail(arguments)))
        : function_to_curry(head(arguments))(brooks(function_to_curry, tail(arguments)))
    )
}

function brooks_curried_1(function_to_curry) {
    return arguments => brooks(function_to_curry, arguments)
}

function brooks_curried_2(function_and_arguments) {
    const function_to_curry = head(function_and_arguments);
    const arguments = tail(function_and_arguments);
    
    return (
        tail(arguments) === null
        ? function_to_curry(head(arguments))
        : tail(tail(arguments)) === null
        ? function_to_curry(head(arguments))(head(tail(arguments)))
        : function_to_curry(head(arguments))(brooks(function_to_curry, tail(arguments)))
    )
}


// Mapping
function scale(items, factor) {
    return (
        is_null(items)
        ? null
        : pair(head(items) * factor, scale(tail(items), factor))
    )
}

function map_list(items, map_func) {
    return (
        is_null(items)
        ? null
        : pair(map_func(head(items)), map_list(tail(items), map_func))
    )
}


// 2.21
function square_list_1(items) {
    return (
        is_null(items)
        ? null
        : pair(head(items) * head(items), square_list_1(tail(items)))
    )
}

function square_list_2(items) {
    return map_list(items, x => x*x);
}

// 2.23
function for_each(items, func) {
    if (items === null) {
        return;
    }
    func(head(items));
    for_each(tail(items), func);
}


function count_leaves(list_of_lists) {
    return (
        is_null(tail(list_of_lists))
        ? length(head(list_of_lists))
        : length(head(list_of_lists)) + count_leaves(tail(list_of_lists))
    )
}


// 2.25
// Extract 7
const list_2_25_1 = make_list(1, 3, make_list(5, 7), 9)
const result_2_25_1 = tail(head(tail(tail(list_2_25_1))))
const list_2_25_2 = make_list(make_list(7))
const result_2_25_2 = head(head(list_2_25_2))
const list_2_25_3 = make_list(1, make_list(2, make_list(3, make_list(4, make_list(5, make_list(6, 7))))))
const result_2_25_3 = head(tail(head(tail(head(tail(head(tail(head(tail(head(tail(list_2_25_3))))))))))))