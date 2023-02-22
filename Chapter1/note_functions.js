function bolzano(f, a, b, tolerance=0.0000001) {
    const  f_a = f(a);
    const f_b = f(b);
    if (Math.sign(f_a) === Math.sign(f_b)) {
        throw Error("Wrong numbers");
    }
    if (f_a === 0) {
        return a;
    }

    if (f_b === 0) {
        return b;
    }
    
    if (Math.abs(f_a - f_b) < tolerance) {
        return a;
    }

    const middle = (a + b) / 2;
    const f_middle = f(middle);
    if (Math.sign(f_middle) == Math.sign(f_a)) {
        return bolzano(f, middle, b);
    } else {
        return bolzano(f, a, middle);
    }

}
