// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {act, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()


describe('useCounter hook', () => {
  let result

  /**
   * When components are too complicated to test using example components like
   * the one we had, we can instead follow the approach below. Where we only
   * test the logic of the component but not the UI that results from using it.
   */
  function TestComponent(props) {
    result = useCounter()
    return null
  }

  it('exposes the count and increment/decrement functions', () => {
    render(<TestComponent />)

    expect(result.count).toBe(0)

    // We need to use act, because react is not expecting state updates
    // Again, by using act, we inform react that this state update was intended!
    act(() => result.increment())
    expect(result.count).toBe(1)

    act(() => result.decrement())
    expect(result.count).toBe(0)
  })
})

/* eslint no-unused-vars:0 */
