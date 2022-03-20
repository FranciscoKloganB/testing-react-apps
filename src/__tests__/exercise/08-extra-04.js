// testing custom hooks
// http://localhost:3000/counter-hook

// Notice we are not using act from @testing-library/react-hooks instead of react-testing-library
import {act, renderHook} from '@testing-library/react-hooks'
import useCounter from '../../components/use-counter'

describe('useCounter hook', () => {
  /**
   * We replace our custom-made test function with a library that cleanly
   * does this for us:
   * - https://github.com/testing-library/react-hooks-testing-library
   */
  it('exposes the count and increment/decrement functions', () => {
    const {result} = renderHook(() => useCounter())

    expect(result.current.count).toBe(0)

    act(() => result.current.increment())
    expect(result.current.count).toBe(1)

    act(() => result.current.decrement())
    expect(result.current.count).toBe(0)
  })

  it('allows customization of the initial count', () => {
    const initialCount = 2
    const {result} = renderHook(() => useCounter({initialCount}))
    expect(result.current.count).toBe(initialCount)
  })

  it('allows customization of the step', () => {
    const step = -1
    const {result} = renderHook(() => useCounter({step}))

    expect(result.current.count).toBe(0)
    act(() => result.current.increment())
    expect(result.current.count).toBe(-1)
  })

  it('allows resetting step', () => {
    const {result, rerender} = renderHook(useCounter, {
      initialProps: {step: 3},
    })

    expect(result.current.count).toBe(0)
    act(() => result.current.increment())

    expect(result.current.count).toBe(3)
    rerender({step: 2})

    act(() => result.current.decrement())
    expect(result.current.count).toBe(1)
  })
})

/* eslint no-unused-vars:0 */
