const counter = document.getElementById("live-counter");

const counterDigits = document.getElementsByClassName("counter-digit")

let currNum = 0;
let ticks;
const time = 1000;

document.onload = function () {
    getData();
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
            update(res);
        }
    })
}

function update(num) {
    const toDigits = num.toString().split('').reverse();
    const fromDigits = currNum.toString().split('').reverse();

    while (fromDigits.length != toDigits.length) {
        fromDigits.push(0);
    }

    for (let i = toDigits.length; i >= 0; i--) {
        if (toDigits[i] != fromDigits[i]) {
            animate((counterDigits.length - 1) - i, toDigits[i]);
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