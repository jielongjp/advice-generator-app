

//Credit for fadeTo function to Matt Kenefick (https://stackoverflow.com/questions/68365106/fade-in-and-fade-out-using-pure-javascript-in-a-simple-way)
function fadeTo(container, toValue = 0, duration = 500) {
    const fromValue = parseFloat(container.style.opacity) || 1;
    const startTime = Date.now();
    const framerate = 1000 / 30; // 60fps
    
    let interval = setInterval(() => {
        const currentTime = Date.now();
        const timeDiff = (currentTime - startTime) / duration;
        const value = fromValue - (fromValue - toValue) * timeDiff;
        
        if (timeDiff >= 1) {
            clearInterval(interval);
            interval = 0;
        }
        
        container.style.opacity = value.toString();
    }, framerate)
}

const container = document.querySelector('.container');
const diceButton = document.querySelector('.dice');

diceButton.addEventListener('click', e => {
    fadeTo(container, 0, 200);
    
    setTimeout(() => {
        fadeTo(container, 1.0, 1000);
    }, 1000);
});

//generate quotes from adviceslip API (https://api.adviceslip.com)
const adviceQuote = document.querySelector('.advice-quote')
const adviceNum = document.querySelector('.advice-number')



diceButton.addEventListener('click', function quoteGenerator(){
    fetch('https://api.adviceslip.com/advice')
    .then(response => response.json())
    .then((data) => data.slip)
    .then((data) => {
        adviceNum.textContent = data.id;
        adviceQuote.textContent = data.advice;
    })
})