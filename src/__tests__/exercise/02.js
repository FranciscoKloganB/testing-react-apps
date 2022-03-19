import * as React from 'react'
import {render, fireEvent } from '@testing-library/react'
import Counter from '../../components/counter'

/**
 * We are importing jest-dom/extend-expect globally on jest.config.
 * If we are using create-react-app, which does not allow us to config jest
 * we can instead use the jest setupFile.js
 */
describe('Counter', () => {
  let message
  let buttons

  // 🐨 swap ReactDOM.render with React Testing Library's render
  // react-testing-library takes care of clearing the dom before each test
  beforeEach(() => {
    const view = render(<Counter />)
    message = view.container.firstChild.querySelector('div')
    buttons = view.container.querySelectorAll('button')
  })

  it('counter starts at 0', () => {
    expect(message).toHaveTextContent('Current count: 0')
  })

  it('increases count by one when increment button is clicked once', () => {
    const [, increment] = buttons

    fireEvent.click(increment)

    expect(message).toHaveTextContent('Current count: 1')
  })

  it('increases count by one when increment button is clicked once', () => {
    const [decrement] = buttons

    fireEvent.click(decrement)

    expect(message).toHaveTextContent('Current count: -1')
  })
})
