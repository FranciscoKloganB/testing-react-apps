// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()
function Counter(props) {
  const {count, increment, decrement} = useCounter(props)

  return (
    <>
      <p>count: {count}</p>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </>
  )
}

describe('useCounter hook', () => {
  describe('when used within a Counter component', () => {
    it('exposes the count and increment/decrement functions', () => {
      render(<Counter />)

      const paragraph = screen.getByText(/count/i)
      expect(paragraph).toHaveTextContent('0')

      const incrementButton = screen.getByRole('button', {name: /increment/i})
      userEvent.click(incrementButton)
      expect(paragraph).toHaveTextContent('1')

      const decrementButton = screen.getByRole('button', {name: /decrement/i})
      userEvent.click(decrementButton)
      expect(paragraph).toHaveTextContent('0')
    })

    it('accepts initial count prop', () => {
      const initialCount = 3
      render(<Counter initialCount={initialCount} />)

      const paragraph = screen.getByText(/count/i)
      expect(paragraph).toHaveTextContent(initialCount)
    })

    it('accepts step prop', () => {
      const step = 4
      render(<Counter step={step} />)

      const paragraph = screen.getByText(/count/i)
      const incrementButton = screen.getByRole('button', {name: /increment/i})
      userEvent.click(incrementButton)
      expect(paragraph).toHaveTextContent(step)
    })
  })
})

/* eslint no-unused-vars:0 */
