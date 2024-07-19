pragma circom 2.1.6;
include "../node_modules/circomlib/circuits/comparators.circom";

// Create a circuit that is satisfied if `numerator`,
// `denominator`, `quotient`, and `remainder` represent
// a valid integer division. You will need a comparison check, so
// we've already imported the library and set n to be 252 bits.
//
// Hint: integer division in Circom is `\`.
// `/` is modular division
// `%` is integer modulus

template IntDiv(n) {
    signal input numerator;
    signal input denominator;
    signal input quotient;
    signal input remainder;

    // denominator > 0
    component isZero = IsZero();
    isZero.in <== denominator;
    isZero.out === 0;

    // remainder should be lesser than denominator
    component lt = LessThan(n);
    lt.in[0] <== denominator;
    lt.in[1] <== remainder;

    lt.out === 0;

    signal a <== quotient * denominator + remainder;
    log(a);
    component num2bits = Num2Bits(2 * n);
    num2bits.in <== a;

    signal temp[n];

    for(var i; i<n; i++) {
        temp[i] <== num2bits.out[i];
    }

    component bits2num = Bits2Num(n);
    for(var i; i<n; i++) {
        bits2num.in[i] <== temp[i];
    }

    numerator === bits2num.out;

}

component main = IntDiv(252);
