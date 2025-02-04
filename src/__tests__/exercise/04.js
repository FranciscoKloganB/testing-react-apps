// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import { build, fake } from '@jackfranklin/test-data-bot'

const buildLoginForm = build({
  fields: {
    username: fake(faker => faker.internet.userName()),
    password: fake(faker => faker.internet.password()),
  },
})

describe('Login', () => {
  let usernameInput
  let passwordInput
  let submitButton

  const handleSubmit = jest.fn()

  beforeEach(() => {
    render(<Login onSubmit={handleSubmit} />)
    usernameInput = screen.getByLabelText(/username/i)
    passwordInput = screen.getByLabelText(/password/i)
    submitButton = screen.getByRole('button', {name: /submit/i})
  })

  it('submitting the form calls onSubmit with username and password', () => {
    const {username, password} = buildLoginForm({password: '!h#ello_-W0rLd1'})

    userEvent.type(usernameInput, username)
    userEvent.type(passwordInput, password)
    userEvent.click(submitButton)

    expect(handleSubmit).toHaveBeenNthCalledWith(1, {username, password})
  })
})

/*
eslint
  no-unused-vars: "off",
*/
