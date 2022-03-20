// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'

function renderWithTheme(ui, {theme = 'light', ...options} = {}) {
  const wrapper = ({children}) => (
    <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  )

  // Return the container for consumers of our API
  return render(ui, { wrapper, ...options })
}

const defaultTheme = 'background-color: white; color: black;'
const darkTheme = 'background-color: black; color: white;'

describe('EasyButton', () => {
  it('renders with the light styles for the light theme', () => {
    renderWithTheme(<EasyButton>Easy</EasyButton>)
    const button = screen.getByRole('button', {name: /easy/i})
    expect(button).toHaveStyle(defaultTheme)
  })

  it('renders with the dark styles for the light theme', () => {
    renderWithTheme(<EasyButton>Easy</EasyButton>, {theme: 'dark'})
    const button = screen.getByRole('button', {name: /easy/i})
    expect(button).toHaveStyle(darkTheme)
  })
})

/* eslint no-unused-vars:0 */
