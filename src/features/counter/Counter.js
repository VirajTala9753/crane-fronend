import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementByAmount, incrementAsync, incrementIfOdd, selectCount } from './counterSlice'
import styles from './Counter.module.css'

export function Counter() {
  const count = useSelector(selectCount)

  const dispatch = useDispatch()
  const [incrementAmount, setIncrementAmount] = useState('2')

  const incrementValue = Number(incrementAmount) || 0

  const bgcolor = ['red', 'green', 'black', 'violet', 'yellow']
  const [index, setIndex] = useState()

  const ChangeBgColor = () => {
    const checkIndex = index > bgcolor.length - 1 || index === undefined
    checkIndex ? setIndex(0) : setIndex(index + 1)
  }

  return (
    <div>
      <div className={styles.row}>
        <img
          src="https://i.pinimg.com/originals/5e/e7/8e/5ee78ef9bec1451a23aa63f5298c18f2.jpg"
          alt=""
          style={{
            display: count.status === 'loading' ? 'flex' : 'none',
            width: '400px',
            height: '400px',
            objectFit: 'cover',
            scale: '1.8',
            position: 'absolute',
            top: '-210px',
            zIndex: '1',
          }}
        />
        <button className={styles.button} aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          -
        </button>
        <span
          className={styles.value}
          style={{
            background: count.status === 'loading' ? 'grey' : bgcolor[index],
            color: bgcolor[index] === 'black' ? 'white' : 'black',
          }}
        >
          {count.value}
        </span>
        <button className={styles.button} aria-label="Increment value" onClick={() => dispatch(increment())}>
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button className={styles.button} onClick={() => dispatch(incrementByAmount(incrementValue))}>
          Add Amount
        </button>
        <button className={styles.button} onClick={ChangeBgColor}>
          change bgColor
        </button>
        <button className={styles.asyncButton} onClick={() => dispatch(incrementAsync(incrementValue))}>
          Add Async
        </button>
        <button className={styles.button} onClick={() => dispatch(incrementIfOdd(incrementValue))}>
          Add If Odd
        </button>
      </div>
    </div>
  )
}
