'use strict';

const quotes = [];

const getQuotes = async () => {

    const response = await fetch('https://goquotes-api.herokuapp.com/api/v1/random?count=10&fbclid=IwAR35ct0-JSMI_fj9vnZAlQ364Rk_AmYktM6LcJ6_Z6NdOikLlHV17vUS5XU');

    if (response.status !== 200) {
        throw new Error('cannot fetch the data');
    }

    const data = await response.json();
    
    return data;
  
};


getQuotes()
    .then(data => {
        console.log('resolved: ', data);
        quotes.push(...data.quotes);
        console.log(quotes);
    })
    .catch(err => console.log('rejected: ', err.message));

const buttonNewQuote = document.querySelector('.quote__button--newquote');

let previousRandomQuote;

function renderNewQuote() {
    if (quotes.length === 0) {
        return null;
    }
    const randomQuote = Math.floor(Math.random() * quotes.length);
    if (randomQuote !== previousRandomQuote) {
        const {text, author} = quotes[randomQuote];
        document.querySelector('.quote__content--text').innerHTML = text;
        document.querySelector('.quote__content--author').innerHTML = author;
        } else {
            console.log('Previous ' + previousRandomQuote);
            console.log('Current ' + randomQuote);
            return renderNewQuote();
        }
    previousRandomQuote = randomQuote;
}

function hexColor() {
    if (quotes.length === 0) {
        return null;
    }
    const newColor = `#${Math.floor(Math.random() * 16777590).toString(16)}`;
    const color = `color: ${newColor}`;
    const background = `background-color: ${newColor}`;
    const quoteMachine = getQuoteMachine();
    quoteMachine.updateColor(color);
    quoteMachine.updateBackground(background);
}

function getQuoteMachine() {
    return {
        content: document.querySelector('.quote__content'),
        buttonTwitter: document.querySelector('.quote__button--twitter'),
        button: document.querySelector('.quote__button--newquote'),
        background: document.querySelector('body'),
        updateColor(color) {
            this.content.setAttribute('style', color);
            this.buttonTwitter.setAttribute('style', color);
        },
        updateBackground(background) {
            this.background.setAttribute('style', background);
            this.button.setAttribute('style', background);
        }
    }
}

buttonNewQuote.addEventListener('click', renderNewQuote);
buttonNewQuote.addEventListener('click', hexColor);
