class Telephone {
    constructor() {
        this.phoneNumbers = new Set();
        this.observers = [];
    }

    addPhoneNumber(number) {
        this.phoneNumbers.add(number);
        this.showOutput(`Added: ${number}`, false);
    }

    removePhoneNumber(number) {
        if(this.phoneNumbers.delete(number)) {
            this.showOutput(`Removed: ${number}`, false);
        } else {
            this.showOutput(`Not found: ${number}`, true);
        }
    }

    dialPhoneNumber(number) {
        if (this.phoneNumbers.has(number)) {
            this.notifyObservers(number);
        } else {
            this.showOutput(`Cannot dial ${number} - not in contacts!`, true);
        }
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers(number) {
        this.observers.forEach(observer => observer.notify(number));
    }

    showOutput(message, isError) {
        const output = document.getElementById('output');
        const div = document.createElement('div');
        div.textContent = message;
        div.className = isError ? 'error' : '';
        output.appendChild(div);
    }
}

class DisplayObserver {
    notify(number) {
        const output = document.getElementById('output');
        output.innerHTML += `<div>Phone number: ${number}</div>`;
    }
}

class DialingObserver {
    notify(number) {
        const output = document.getElementById('output');
        output.innerHTML += `<div style="color: #2ecc71">Now Dialling ${number}</div>`;
    }
}

const telephone = new Telephone();
telephone.addObserver(new DisplayObserver());
telephone.addObserver(new DialingObserver());

let currentNumber = '';

function appendNumber(num) {
    currentNumber += num;
    updateDisplay();
}

function clearDisplay() {
    currentNumber = '';
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').textContent = 
        currentNumber || '0';
}

function addNumber() {
    if (currentNumber) {
        telephone.addPhoneNumber(currentNumber);
        clearDisplay();
    }
}

function removeNumber() {
    if (currentNumber) {
        telephone.removePhoneNumber(currentNumber);
        clearDisplay();
    }
}

function dialNumber() {
    if (currentNumber) {
        telephone.dialPhoneNumber(currentNumber);
        clearDisplay();
    }
}