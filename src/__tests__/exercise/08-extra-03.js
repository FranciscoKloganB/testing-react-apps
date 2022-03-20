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
  let result = {}

  /**
   * When components are too complicated to test using example components like
   * the one we had, we can instead follow the approach below. Where we only
   * test the logic of the component but not the UI that results from using it.
   */

  function setup(initialProps = {}) {
    const result = {}

    function TestComponent() {
      /**
       * We need to do this hack in order to keep `result` at L25 in synch with
       * result used in our tests. Otherwise, if the test updates the state
       * like some of our tests do, their result would become referentially
       * different than the one inside setup, causing tests to fail.
       *
       * This is was not an issue on previous tests because our result was
       * always the result of useCounter and not a new object accepting props!
       */
      result.current = {...result, ...useCounter(initialProps)}
      return null
    }

    render(<TestComponent />)

    return result
  }

  it('exposes the count and increment/decrement functions', () => {
    const result = setup()

    expect(result.current.count).toBe(0)

    // We need to use act, because react is not expecting state updates
    // Again, by using act, we inform react that this state update was intended!
    act(() => result.current.increment())
    expect(result.current.count).toBe(1)

    act(() => result.current.decrement())
    expect(result.current.count).toBe(0)
  })

  it('allows customization of the initial count', () => {
    const initialCount = 2
    const result = setup({initialCount})
    expect(result.current.count).toBe(initialCount)
  })

  it('allows customization of the step', () => {
    const step = -1
    const result = setup({step})

    expect(result.current.count).toBe(0)
    act(() => result.current.increment())
    expect(result.current.count).toBe(-1)
  })
})

/* eslint no-unused-vars:0 */
