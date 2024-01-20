let screen = 0;
let operationTrack = []
let numberTrack = []
const buttonValues = [
    'C', '←', '÷','x',
    '-', '+', '='
  ];
const operationValues = [
    '÷','x','-', '+'
]

const buttons = document.querySelectorAll('.button-click');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        evaluateInput(event.target.innerText)    
    });
});

function setResult(value) {
    // Get the results div by its class name
    const resultsDiv = document.querySelector('.results');
    // Set the text content of the div
    if(screen === 0){
        screen = value
    } else {
        screen = screen + value
    }
    resultsDiv.textContent = screen;
}

function clearCalculator() {
    numberTrack = []
    operationTrack = []
    screen = 0
    setResult(0)
}

function clearPostCalculation() {
    numberTrack = []
    operationTrack = []

}

function executeCalculation(){
    screen = numberTrack[0] 
    for(let i = 0; i < operationTrack.length; i++) {
        let operation = operationTrack[i]
        let nextNumber = numberTrack[i + 1]

        switch (operation){
            case 'x':
                screen *= nextNumber
                break;
            case '/':
                screen /= nextNumber
                break
            case '-':
                screen -= nextNumber
                break
            case '+':
                screen += nextNumber
                break
        }
    }
    clearPostCalculation()
    setResult(screen)
}

function evaluateOperation(input){
    //if its a C
    if(input == 'C'){
        clearCalculator()
    }
    //if its an equal you to carry out the operation and show resutls
    if(input == '='){
        //do something
        numberTrack.push(screen)
        executeCalculation()
    }
    //if its an operation 
    if(operationValues.includes(input)){
        numberTrack.push(screen)        
        operationTrack.push(input)
        screen = 0
        setResult(0)
    }
}

function evaluateInput(input) {
    if(!isNaN(input)){
        const num = parseFloat(input)
        setResult(input)
    }
    if(buttonValues.includes(input)){
        evaluateOperation(input)
    }
}

function isInteger(number) {
    return Number.isInteger(number);
}