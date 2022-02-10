import { useState, useEffect } from 'react'

import './App.css'

// Helper function: check if prime
function isPrime(num) {
  if (num <= 1) return false
  if (num === 2) return true

  const square = Math.sqrt(num)

  for (let i = 2; i <= square; i++) {
    if (num % i === 0) return false
  }

  return true
}

// Helper function: check if fibonacci
function isFibonacci(num, count = 1, last = 0) {
  if (num === 0) return true
  if (count < num) return isFibonacci(num, count + last, count)
  if (count === num) return true
  return false
}

function App() {
  const [rawNum, setRawNum] = useState('')
  const [num, setNum] = useState('')
  const [calculation, setCalculation] = useState('prime')
  const [result, setResult] = useState('')

  // Check if raw input number is negative or not integer
  useEffect(() => {
    if (!rawNum) {
      setNum('')
      return
    }

    const numValue = +rawNum

    if (numValue < 0) {
      setNum(1)
    } else {
      if (!Number.isInteger(numValue)) {
        const roundedNum = Math.round(numValue)
        setNum(roundedNum)
      } else {
        setNum(numValue)
      }
    }
  }, [rawNum])

  // When num or/and calculation type change, run the code to recalculate the result
  useEffect(() => {
    if (typeof num !== 'number') {
      setResult('')
      return
    }

    if (calculation === 'prime') {
      if (isPrime(num)) {
        setResult('true')
      } else {
        setResult('false')
      }
    }

    if (calculation === 'fibonacci') {
      if (isFibonacci(num)) {
        setResult('true')
      } else {
        setResult('false')
      }
    }
  }, [num, calculation])

  function handleChangeNum(e) {
    if (e.target.name === 'num') {
      const value = e.target.value

      if (value) {
        setRawNum(value)
      } else {
        setRawNum('')
      }
    }
  }

  function handleChangeCalculation(e) {
    setCalculation(e.target.value)
  }

  return (
    <div className='App'>
      <div className='container'>
        <div className='col left'>
          <input
            type='number'
            name='num'
            value={num}
            onChange={handleChangeNum}
          />
        </div>
        <div className='col center'>
          <select value={calculation} onChange={handleChangeCalculation}>
            <option value='prime'>isPrime</option>
            <option value='fibonacci'>isFibonacci</option>
          </select>
        </div>
        <div className='col right'>{result}</div>
      </div>
    </div>
  )
}

export default App
