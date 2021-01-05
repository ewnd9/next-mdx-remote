import React, { useState } from 'react'

export const WidgetA = () => {
  const [counter, setCounter] = useState(0)

  return (
    <div>
      <button onClick={() => setCounter((counter) => counter + 1)}>
        {counter}
      </button>
    </div>
  )
}
