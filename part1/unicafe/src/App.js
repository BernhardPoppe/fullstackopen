import React, { useState } from 'react'

const Button = ({text, eventHandler}) => {
  return(
      <button onClick={eventHandler}>{text}</button>
  );
}

const Display = ({text, number}) => {
  return(
      <>
        <b>{text}:</b> {number}<br/>
      </>
  );
}

const Statistics = ({good, neutral, bad}) => {
  const sum = good + neutral + bad;
  const av = (good - bad) / (sum);
  const positive = (good/sum) * 100;

  return (
    <div>
      <Display text="good" number={good}/>
      <Display text="neutral" number={neutral} />
      <Display text="bad" number={bad} />
      <Display text="all" number={sum} />
      <Display text="average" number={av || 0} />
      <Display text="positive" number={(positive || 0) + "%"} />
    </div>
      
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
      <Statistics good={good} neutral={neutral} bad={bad} />  

    </div>
  )
}

export default App