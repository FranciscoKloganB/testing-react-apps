// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

describe('Login', () => {
  let submittedData
  let usernameInput
  let passwordInput
  let submitButton

  function handleSubmit(data) {
    submittedData = data
  }

  beforeEach(() => {
    render(<Login onSubmit={handleSubmit} />)
    usernameInput = screen.getByLabelText(/username/i)
    passwordInput = screen.getByLabelText(/password/i)
    submitButton = screen.getByRole('button', {name: /submit/i})
  })

  it('submitting the form calls onSubmit with username and password', () => {
    const username = 'user'
    const password = 'pass'
    
    userEvent.type(usernameInput, username)
    userEvent.type(passwordInput, password)
    userEvent.click(submitButton)

    expect(submittedData).toEqual({ username, password })
  })
})

/*
eslint
  no-unused-vars: "off",
*/
