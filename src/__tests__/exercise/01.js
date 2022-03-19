// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

describe('Counter', () => {
  let div;
  let message;
  let buttons;

  const mouseEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })

  beforeEach(() => {
    // 🐨 create a div to render your component to (💰 document.createElement)
    // 🐨 append the div to document.body (💰 document.body.append)
    // 🐨 use ReactDOM.render to render the <Counter /> to the div
    // 🐨 get a reference to the increment and decrement buttons:
    //   💰 div.querySelectorAll('button')
    // 🐨 get a reference to the message div:
    //   💰 div.firstChild.querySelector('div')
    document.body.innerHTML = ''
    div = document.createElement('div')
    document.body.append(div)
    ReactDOM.render(<Counter />, div)

    message = div.firstChild.querySelector('div')
    buttons = div.querySelectorAll('button')
  })

  afterEach(() => {
    div.remove()
  })

  it('counter starts at 0', () => {
    expect(message.textContent).toBe('Current count: 0')
  })

  it('increases count by one when increment button is clicked once', () => {
    const [_, increment] = buttons

    increment.dispatchEvent(mouseEvent)

    expect(message.textContent).toBe('Current count: 1')
  })

  it('increases count by one when increment button is clicked once', () => {
    const [decrement, _] = buttons

    decrement.dispatchEvent(mouseEvent)

    expect(message.textContent).toBe('Current count: -1')
  })
})

/* eslint no-unused-vars:0 */
