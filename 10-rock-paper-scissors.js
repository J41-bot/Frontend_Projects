let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
  };
  updateScoreElement();  
  
  /*
  if(!score) {
    score = {
    wins: 0,
    losses: 0,
    ties: 0
    };
  } */
  function playGame(playerMove) {
    let result = '';
    let computerMove = pickComputerMove();
  
    if (playerMove === 'rock') {
      if (computerMove === 'rock') {
        result = 'Tie.';
      } else if (computerMove === 'paper') {
        result = 'You lose.';
      } else {
        result = 'You win.';
      }
    }
  
    if (playerMove === 'paper') {
      if (computerMove === 'rock') {
        result = 'You win.';
      } else if (computerMove === 'paper') {
        result = 'Tie.';
      } else {
        result = 'You lose.';
      }
    }
  
    if (playerMove === 'scissors') {
      if (computerMove === 'rock') {
        result = 'You lose.';
      } else if (computerMove === 'paper') {
        result = 'You win.';
      } else {
        result = 'Tie.';
      }
    }
  
    if (result === 'You win.') {
      score.wins += 1;
    } else if (result === 'You lose.') {
      score.losses += 1;
    } else if (result === 'Tie.') {
      score.ties += 1;
    }
    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();
    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You
  <img src="${playerMove}-emoji.png" class="move-icon">
  <img src="${computerMove}-emoji.png" class="move-icon">
  Computer`;
  }
  
  function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties};`
  }
  
  function pickComputerMove() {
    let randomNumber = Math.random();
    let computerMove = '';
  
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
      computerMove = 'paper';
    } else {
      computerMove = 'scissors';
    }
  
    return computerMove;
  }
  
