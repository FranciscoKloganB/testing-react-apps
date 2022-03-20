// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react'
// 🐨 you'll need to grab waitForElementToBeRemoved from '@testing-library/react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
// 🐨 you'll need to import rest from 'msw' and setupServer from msw/node
import {rest} from 'msw'
import {setupServer} from 'msw/node'

import Login from '../../components/login-submission'
import {handlers} from 'test/server-handlers'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

const server = setupServer(...handlers)

describe('Login', () => {
  beforeAll(() => server.listen())
  beforeEach(() => render(<Login />))
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('submitting the form calls onSubmit with username and password', async () => {
    const {username, password} = buildLoginForm()

    userEvent.type(screen.getByLabelText(/username/i), username)
    userEvent.type(screen.getByLabelText(/password/i), password)

    userEvent.click(screen.getByRole('button', {name: /submit/i}))

    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

    expect(screen.getByText(username)).toBeInTheDocument()
  })

  describe('the credentials are invalid', () => {
    it('fails when password is not submitted', async () => {
      const {username} = buildLoginForm()

      userEvent.type(screen.getByLabelText(/username/i), username)
      userEvent.click(screen.getByRole('button', {name: /submit/i}))

      await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

      expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
        `"password required"`,
      )
    })

    it('fails when username is not submitted', async () => {
      const {password} = buildLoginForm()

      userEvent.type(screen.getByLabelText(/password/i), password)
      userEvent.click(screen.getByRole('button', {name: /submit/i}))

      await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

      expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
        `"username required"`,
      )
    })
  })

  describe('unexpected errors occur on the backend', () => {
    const textErrorMessage = 'ups, something went wrong'
    
    beforeEach(() => {
      server.use(
        rest.post(
          'https://auth-provider.example.com/api/login',
          async (req, res, ctx) => {
            return res(ctx.status(500), ctx.json({message: textErrorMessage}))
          },
        ),
      )
    })

    it('displays the error message to the user', async () => {
      userEvent.click(screen.getByRole('button', {name: /submit/i}))

      await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

      expect(screen.getByRole('alert')).toHaveTextContent(textErrorMessage)
    })
  })
})
