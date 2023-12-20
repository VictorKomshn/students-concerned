const counter = document.getElementById("live-counter");

const counterDigits = document.getElementsByClassName("counter-digit")

let currNum = 0;
let ticks;
const time = 1000;

window.onload = function () {
    return jQuery.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'type': 'POST',
        'url': "/livedata",
        'dataType': 'json',
        'success': function (res) {
            update(res, false);
        }
    })
}

function getData() {
    return jQuery.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'type': 'POST',
        'url': "/livedata",
        'dataType': 'json',
        'success': function (res) {
            update(res,true);
        }
    })
}

function update(num,executeAnimation) {
    const toDigits = num.toString().split('').reverse();
    const fromDigits = currNum.toString().split('').reverse();

    while (fromDigits.length != toDigits.length) {
        fromDigits.push(0);
    }

    for (let i = toDigits.length; i >= 0; i--) {
        if (toDigits[i] != fromDigits[i]) {
            if (executeAnimation == true) {
                animate((counterDigits.length - 1) - i, toDigits[i]);
            }
            else {
                counterDigits[(counterDigits.length - 1) - i].innerText = toDigits[i];
            }
        }
    }
    currNum = num;
}

function animate(index, digit) {
    var element = counterDigits[index];
    var cloneElement = element.lastElementChild.cloneNode(true);
    cloneElement.innerText = digit;
    element.appendChild(cloneElement);
    element.classList.add('move');
    setTimeout(function () {
        element.classList.remove('move');
    }, 1000);

    setTimeout(function () {
        element.removeChild(element.firstElementChild);
    }, 1000);
}


setInterval(() => getData(), 3000);