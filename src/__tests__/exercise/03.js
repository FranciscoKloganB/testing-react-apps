import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from '../../components/counter'

/**
 * In this exercise we avoid abstraction details by using selectors that
 * depend less on the way components are constructed with respect to their JSX
 * structure.
 *
 * We do this by using these two libs:
 * - @testing-library/user-event
 * - @testing-library/dom
 *
 * Finally, if you are in doubt about what query to use visit:
 * - https://testing-library.com/docs/queries/about/
 * Or if you have access to the code, paste it on the website below:
 * - https://testing-playground.com/
 */
describe('Counter', () => {
  let message

  beforeEach(() => {
    render(<Counter />)
    message = screen.getByText(/current count/i)
  })

  it('counter starts at 0', () => {
    expect(message).toHaveTextContent('Current count: 0')
  })

  it('increases count by one when increment button is clicked once', () => {
    const increment = screen.getByRole('button', {name: /increment/i})

    userEvent.click(increment)

    expect(message).toHaveTextContent('Current count: 1')
  })

  it('increases count by one when increment button is clicked once', () => {
    const decrement = screen.getByRole('button', {name: /decrement/i})

    userEvent.click(decrement)

    expect(message).toHaveTextContent('Current count: -1')
  })
})
