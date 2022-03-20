// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render as rtlRender, screen} from '@testing-library/react'
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'
import userEvent from '@testing-library/user-event'

function Wrapper({children}) {
  return <ThemeProvider initialTheme="light">{children}</ThemeProvider>
}

function render(Component, options) {
  return rtlRender(Component, {wrapper: Wrapper, ...options})
}

const defaultTheme = 'background-color: white; color: black;'
const darkTheme = 'background-color: black; color: white;'

describe('EasyButton', () => {
  it('renders with the light styles for the light theme', () => {
    render(<EasyButton>Easy</EasyButton>)
    const button = screen.getByRole('button', {name: /easy/i})
    expect(button).toHaveStyle(defaultTheme)
  })

  it('renders with the dark styles for the light theme', () => {
    render(<EasyButton initialTheme="dark">Easy</EasyButton>)
    const button = screen.getByRole('button', {name: /easy/i})
    expect(button).toHaveStyle(darkTheme)
  })
})

/* eslint no-unused-vars:0 */
