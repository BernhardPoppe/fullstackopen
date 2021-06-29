import React, { useState } from 'react'

const Button = ({text, eventHandler}) => {
  return(
      <button onClick={eventHandler}>{text}</button>
  );
}

const Statistic = ({text, value}) => {
  return(
      <tr>
        <td>{text}:</td><td>{value}</td>
      </tr>
  );
}

const Statistics = ({good, neutral, bad}) => {
  const sum = good + neutral + bad;
  const av = (good - bad) / (sum);
  const positive = (good/sum) * 100;


  if (sum === 0){
    return (
      <div>
        No feedback given
      </div>
    )
  } else {
    return (
      <div>

        <table>
           <tbody>
              <Statistic text="good" value={good}/>
              <Statistic text="neutral" value={neutral}/>
              <Statistic text="bad" value={bad}/>
              <Statistic text="all" value={sum}/>
              <Statistic text="average" value={av || 0}/>
              <Statistic text="positive" value={(positive || 0) + "%"}/>
           </tbody>
        </table>
      </div>   
    )
  }
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

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