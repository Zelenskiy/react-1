import React, {useState} from 'react';

const Counter = function () {
  const [likes, setLikes] = useState(5)
  const [value, setValue] = useState('qqqqq')

  function increment() {
    setLikes(likes + 1)
  }

  function decrement() { 
    setLikes(likes - 1)
  }


  return (
    <div className='Counter'>
      <h1>{likes}</h1>
      <h1>{value}</h1>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
      <input 
      type="text"
      value= {value}
      onChange={(event) => setValue(event.target.value)}/>
    </div>
  )

}

export default Counter