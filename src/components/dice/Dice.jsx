const Dice = ({ number, diceImages }) => {
    return (
      <img 
        src={diceImages[number - 1]} 
        alt={`Dice showing ${number}`} 
        style={{ width: '200px', height: '200px' }} 
      />
    );
  };
  
  export default Dice;