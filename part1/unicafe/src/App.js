import React, { useState } from 'react'

const Button = ({text, eventHandler}) => {
  return(
      <button onClick={eventHandler}>{text}</button>
  );
}

const Display = ({text, number}) => {
  return(
      <div>{text} {number}</div>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  console.log("good:", good);
  console.log("neutral:", neutral);
  console.log("bad:", bad);



  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" eventHandler={()=>setGood(good+1)} />
      <Button text="neutral" eventHandler={()=>setNeutral(neutral+1)} />
      <Button text="bad" eventHandler={()=>setBad(bad+1)} />

      <h1>statistics</h1>
      <Display text="good" number={good} />
      <Display text="neutral" number={neutral} />
      <Display text="bad" number={bad} />
    </div>
  )
}

export default App