(function() {
  'use strict';

  var scores, roundScore, activePlayer, gamePlaying;
  var diceDOM = document.querySelector('.dice');

  init();

  /*
    EVENTS
  */
  document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gamePlaying) {
      var activePlayerDOM = document.querySelector('#current-' + activePlayer);
      var diceNum = Math.floor(Math.random() * 6) + 1;
    
      diceDOM.style.display = 'block';
      diceDOM.src = 'images/dice-' + diceNum + '.png';
    
      if (diceNum  !== 1) {
        roundScore += diceNum;
        activePlayerDOM.textContent = roundScore;
      } else {
        nextPlayer();
      }
    }
  });

  document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying) {
      scores[activePlayer] += roundScore;
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

      if (scores[activePlayer] >= 100) {
        playerWon();
      } else {
        nextPlayer();
      }
    }
  });

  document.querySelector('.btn-new').addEventListener('click', init);


  /*
    FUNCTIONS
  */
  function playerWon() {
    document.querySelector('#name-' + activePlayer).textContent = "WINNER";
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    diceDOM.style.display = 'none';
    gamePlaying = false;
  }

  function nextPlayer() {
    var activePlayerDOM = document.querySelector('#current-' + activePlayer);
    activePlayerDOM.textContent = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    diceDOM.style.display = 'none';
  }

  function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    diceDOM.style.display = 'none';

    // Set Starting Score & Names
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('#name-0').textContent = "Player 1";
    document.querySelector('#name-1').textContent = "Player 2";

    // Remove Win Class & Active First Player
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
  }
})();