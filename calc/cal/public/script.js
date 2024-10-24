let ci = '', pi = '', operator = '';
let ac = false, hasop = false;

const display = document.getElementById('display');

document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('off')) {
            stops();
            return;
        }

        if (button.classList.contains('clear')) {
            cleard();
            return;
        }

        if (button.classList.contains('operator')) {
            if (!ci) return;

            if (hasop) {
                pi = calculate(pi, operator, ci);
                display.value = pi;
            } else {
                pi = ci;
            }

            if (value === '√') {
                const result = Math.sqrt(parseFloat(ci));
                display.value = result;
                pi = result; 
                ci = ''; 
                operator = ''; 
                ac = true; 
                hasop = false; 
            } else {
                operator = value;
                ci = '';
                hasop = true;
            }
            return;
        }

        if (button.classList.contains('equal')) {
            if (ci && pi && operator) {
                display.value = `${calculate(pi, operator, ci)}`;
                pi = display.value; 
                ci = ''; 
                operator = ''; 
                ac = true; 
                hasop = false; 
            }
            return;
        }

        if (button.classList.contains('dot')) {
            if (!hasop && !ci.includes('.')) {
                ci += '.';
                display.value = ci;
            }
            return;
        }

        ci = ac ? value : ci + value;
        ac = false;
        display.value = ci;
    });
});

function calculate(pi, operator, ci) {
    pi = parseFloat(pi);
    ci = parseFloat(ci);
    switch (operator) {
        case '+': return pi + ci;
        case '-': return pi - ci;
        case '*': return pi * ci;
        case '÷': return pi / ci;
        default: return ci;
    }
}

function stops() {
    window.close();
}

function cleard() {
    ci = pi = operator = '';
    display.value = '';
    ac = hasop = false;
}
