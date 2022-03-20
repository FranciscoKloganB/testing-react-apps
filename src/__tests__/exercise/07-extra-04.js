// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import EasyButton from '../../components/easy-button'
import {render as renderWithTheme, screen} from '../../test/test-utils'

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
