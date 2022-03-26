let result = 0;

function addition (a, b) {
    result = a + b;
    console.log(result);
}

function subtraction (a, b) {
    result = a - b;
    console.log(result);
}

function multiplication (a, b) {
    result = a * b;
    console.log(result);
}

function division (a, b) {
    result = a / b;
    console.log(result);
}

function operator (a, b, o) {
    if (o == 0) {
        addition(a, b);
    } else if (o == 1) {
            subtraction(a, b);
            } else if (o == 2) {
                multiplication(a, b);
                } else if (o == 3) {
                        division(a, b);
                    }
}