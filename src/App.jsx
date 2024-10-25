import React, { useState, useEffect } from 'react';
import './App.css';
import Dice from './components/dice/Dice';
import Dice1 from './assets/images/dice1.png';
import Dice2 from './assets/images/dice2.png';
import Dice3 from './assets/images/dice3.png';
import Dice4 from './assets/images/dice4.png';
import Dice5 from './assets/images/dice5.png';
import Dice6 from './assets/images/dice6.png';

const diceImages = [
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6
];

function App() {

  const [playerName, setPlayerName] = useState('Player 1');
  const [newName, setNewName] = useState('');
  const [playerDice, setPlayerDice] = useState(1);
  const [computerDice, setComputerDice] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState(null);
  const [resultColor, setResultColor] = useState('var(--text-color)');
  const [animateResult, setAnimateResult] = useState(false);

  
  const rollDice = () => {
    setRolling(true);
    setResult('');
    setResultColor('var(--text-color)');
    setAnimateResult(false);

    
    let rollCount = 0;
    const rollInterval = setInterval(() => {
      setPlayerDice(Math.floor(Math.random() * 6) + 1);
      setComputerDice(Math.floor(Math.random() * 6) + 1);
      rollCount++;
      if (rollCount >= 30) {
        clearInterval(rollInterval);
        setRolling(false);
        determineWinner();
      }
    }, 100); 
  };

  
  useEffect(() => {
    if (!rolling && result === null) return;
    if (!rolling) {
      if (playerDice > computerDice) {
        setResult('Tasty!');
        setResultColor('green');
      } else if (playerDice < computerDice) {
        setResult('Sad Story :(');
        setResultColor('red');
      } else {
        setResult('There is no winner!');
        setResultColor('var(--primary-color)');
      }
      setAnimateResult(true);
    }
  }, [rolling, playerDice, computerDice]);

 
  const handleNameInputChange = (e) => {
    setNewName(e.target.value);
  };
  
  const handleNameChange = (e) => {
    if (newName.trim() !== '') {
      setPlayerName(newName); // Update player name
      setNewName(''); 
    }
  };

  return (
    <>
      <div className="container">
        <h1>Dice Game</h1>

        {/* Input to change player name */}
        <div className='input-container'>
          <input
            type="text"
            value={newName}
            onChange={handleNameInputChange}
            placeholder="Your name"
          />
          <button onClick={handleNameChange}> Change Name</button>
        </div>

        <div className='dice-container'>
          {/* Player section */}
          <div className="player-section">
            <h2>{playerName}</h2>
            <Dice number={playerDice} diceImages={diceImages} />
          </div>

          {/* Computer section */}
          <div className="computer-section">
            <h2>Computer</h2>
            <Dice number={computerDice} diceImages={diceImages} />
          </div>
        </div>

        <div className='result-container'>{/* Roll Dice button */}
          <button onClick={rollDice} disabled={rolling}>
            {rolling ? 'Gambling...' : 'Roll Dice'}
          </button>
          {/* Display result */}
          <h2 style={{ color: resultColor, animation: animateResult ? 'scale-animation 2s infinite' : 'none' }} >{result}</h2>
        </div>
      </div>
    </>
  );
}

export default App;