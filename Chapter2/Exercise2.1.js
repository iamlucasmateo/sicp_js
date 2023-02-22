function gcd(x, y) {
    return (
        x % y === 0
        ? y
        : gcd(y, x % y)
    )
}


// Exercise 2.1
class Rational {
    constructor(n, d) {
        if (d === 0) {
            throw new Error("Zero denominator not allowed.")
        }
        const _gcd = gcd(n, d);
        const _sign = Math.sign(n) + Math.sign(d) === 0 ? -1 : 1; 
        this.numerator = _sign * (n / _gcd);
        this.denominator = Math.abs(d / _gcd);
    }

    get_den = () => {
        return this.denominator;
    }

    get_num = () => {
        return this.numerator;
    }
}


// Exercise 2.2
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Segment {
    constructor(point1, point2) {
        this.point1 = point1;
        this.point2 = point2;
    }

    get_midpoint() {
        const midX = (this.point1.x + this.point2.x) / 2;
        const midY = (this.point1.y + this.point2.y) / 2;
        return new Point(midX, midY)
    }
}

// Exercise 2.3
class RectanglePoints {
    constructor(point1, point2) {
        this.point1 = point1;
        this.point2 = point2;
        this.point3 = new Point(point1.x, point2.y);
        this.point4 = new Point(point2.x, point1.y);
    }

    perimeter() {
        return (this.width() + this.height()) * 2;
    }

    area() {
        return this.width() * this.height();
    }

    width() {
        return Math.abs(this.point1.x - this.point2.x);
    }

    height() {
        return Math.abs(this.point1.y - this.point2.y);
    }
}

class Rectangle {
    constructor() {

    }
}

// Exercise 2.4
function pair_rep1(x, y) {
    return m => m(x, y)
}

function head_rep1(my_pair) {
    return my_pair((p, q) => p)
}


function tail_rep1(my_pair) {
    return my_pair((p, q) => q)
}


// Exercise 1.25
function pair_rep2(x, y) {
    return (2**x)*(3**y);
}

function _deduce_exponent(reduced, root, steps=0) {
    return (
        reduced % root !== 0
        ? steps
        : _deduced_exponent(reduced / root, root, steps + 1)
    )
}

function head_rep2(my_pair) {
    return _deduce_exponent(my_pair, 2);
}

function tail_rep2(my_pair) {
    return _deduce_exponent(my_pair, 3);
}
