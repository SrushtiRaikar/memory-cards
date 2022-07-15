import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard'

const cardImages=[
  { "src": "/img/helmet-1.png" ,matched: false},
  { "src": "/img/potion-1.png" ,matched: false},
  { "src": "/img/ring-1.png" ,matched: false},
  { "src": "/img/scroll-1.png" ,matched: false},
  { "src": "/img/shield-1.png" ,matched: false},
  { "src": "/img/sword-1.png" ,matched: false}
]

function App() {
  const[cards,setCards]=useState([])
  const [turns,setTurns]=useState(0)
  const[choiceOne,setChoiceOne]=useState(null)
  const[choiceTwo,setChoiceTwo]=useState(null)
  const [disabled,setDisabled]=useState(false)



  //shuffle cards

  const shuffleCards=()=>{
    const shuffledCards=[...cardImages, ...cardImages]
    .sort(() => Math.random() -0.5)
    .map((card) =>({...card,id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  //handle choicce
  const handleChoice=(card)=>{
    choiceOne ? setChoiceTwo(card):setChoiceOne(card)
  }

  //compare 2 cards
  useEffect(() =>{
    
    if(choiceOne && choiceTwo){
      setDisabled(true)

      if(choiceOne.src===choiceTwo.src){
        // console.log('cards match')
        setCards(prevCards=> {
          return prevCards.map(card =>{
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            }
            else{
              return card
            }
          })
        })
        resetTurn()
      }
      else{
       // console.log('cards dont match')
        setTimeout(() => resetTurn(), 600)
      }
    }
  },[choiceOne,choiceTwo])

  

  //reset choice and increase the turn
const resetTurn=()=>{
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns( prevTurns => prevTurns+1 )
  setDisabled(false)
}

//starts new game automatically
useEffect(() => {
  shuffleCards()
},[])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button  onClick={shuffleCards}>Start New Game !</button>

      <div className='card-grid'>
          {cards.map(card=> (
            <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
            />
          ))}
      </div>

      <p>Turns : {turns}</p>
    </div>
  );
}

export default App;
