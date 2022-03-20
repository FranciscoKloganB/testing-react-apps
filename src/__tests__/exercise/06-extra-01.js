import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import {useCurrentPosition} from 'react-use-geolocation'
import Location from '../../examples/location'

jest.mock('react-use-geolocation')

describe('Location', () => {
  let setLocation

  const fakePosition = {
    coords: {latitude: 33, longitude: 34},
  }

  beforeEach(() => {
    function useMockCurrentPosition() {
      const [state, setState] = React.useState([])
      setLocation = setState
      return state
    }
    useCurrentPosition.mockImplementation(useMockCurrentPosition)
  })

  describe('success', () => {
    it('displays the users current location', async () => {
      render(<Location />)

      expect(useCurrentPosition).toHaveBeenCalledWith() // no args
      expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

      act(() => {
        setLocation([fakePosition])
      })

      expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
      expect(screen.getByText(/latitude/i)).toHaveTextContent(
        `Latitude: ${fakePosition.coords.latitude}`,
      )
      expect(screen.getByText(/longitude/i)).toHaveTextContent(
        `Longitude: ${fakePosition.coords.longitude}`,
      )
    })
  })

  describe('failure', () => {
    const error = {message: 'ups, could not obtain location' }

    it('displays the users current location', async () => {
      render(<Location />)

      expect(useCurrentPosition).toHaveBeenCalledWith() // no args
      expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

      act(() => {
        setLocation([fakePosition, error])
      })

      expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
      expect(screen.getByRole('alert')).toHaveTextContent(error.message)
    })
  })
})
