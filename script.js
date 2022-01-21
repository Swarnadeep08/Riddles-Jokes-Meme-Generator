function clearAll() {
  const memeContainer = document.querySelector('.meme-content');
  const jokeContainer = document.querySelector('.joke-content');
  const quoteContainer = document.querySelector('.quote-content');
  const riddleContainer = document.querySelector('.riddle-content');

  memeContainer.innerHTML = '';
  jokeContainer.innerHTML = '';
  quoteContainer.innerHTML = '';
  riddleContainer.innerHTML = '';
}

var after='';

function showMeme() {
  // Value is a image representing the meme
  fetch(`https://www.reddit.com/r/memes.json?after=${after}`)
  .then(response => response.json())
  .then(body => {
    after=body.data.after;
    for (var i = 0; i < body.data.children.length; i++) {
      if(body.data.children[i].data.post_hint === 'image'){
        const container = document.querySelector('.meme-content');
        const newImg = document.createElement('img');
        newImg.src = body.data.children[i].data.url_overridden_by_dest;
        clearAll();
        container.appendChild(newImg);
      }
    }
  });
}

function showJoke() {
  // Value is a string representing the joke
  const randomJoke = getRandomJokes();

  const setup = randomJoke["setup"];
  const punchline = randomJoke["punchline"];

  const newSetup = document.createElement('p');
  const newPunchline = document.createElement('p');
  newSetup.textContent = setup;
  newPunchline.textContent = punchline;

  clearAll();

  const container = document.querySelector('.joke-content');
  container.appendChild(newSetup);
  container.appendChild(newPunchline);
}

function showQuote() {
  // Value should be in format: { quote: '', author: '' }
  const randomQuote = getRandomQuotes();

  const quote = document.createElement('p');
  const author = document.createElement('p');
  quote.textContent = randomQuote.quote;
  author.textContent = "- " + randomQuote.author;

  clearAll();

  const container = document.querySelector('.quote-content');
  container.appendChild(quote);
  container.appendChild(author);
}

function showRiddle() {
  // Value should be in format: { question: '', answer: '' }
  const randomRiddle = getRandomRiddles();

  const { question, answer } = randomRiddle;

  const questionElem = document.createElement('p');
  questionElem.textContent = question;

  const answerElem = document.createElement('p');
  answerElem.textContent = 'The answer is: ' + answer;
  answerElem.setAttribute('id', 'riddle-answer');
  answerElem.hidden = true;

  const container = document.querySelector('.riddle-content');

  clearAll();

  container.appendChild(questionElem);
  container.appendChild(answerElem);
}

function revealAnswers() {
  const riddleContainer = document.querySelector('.riddle-content');
  const riddle = riddleContainer.querySelector('p');
  const answer = document.querySelector('#riddle-answer');

  // console.log(answer.hidden);
  if (riddle && answer.hidden) {
    answer.hidden = false;
  } else if (riddle) {
    alert('The answer is already revealed!')
  } else {
    alert('There is no riddle to reveal the answer to!')
  }
}

// Generates a random joke
function getRandomJokes() {
  return jokes[rn(jokes.length)];
}

// Generates a random quote
function getRandomQuotes() {
  return quotes[rn(quotes.length)];
}

// Generates a random riddle
function getRandomRiddles() {
  return riddles[rn(riddles.length)];
}

// Just a little helper function
function rn(len) {
  return Math.floor(Math.random() * len);
}
