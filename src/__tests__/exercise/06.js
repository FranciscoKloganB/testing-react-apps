// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'

// 💰 I'm going to give you this handy utility function
// it allows you to create a promise that you can resolve/reject on demand.
function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}
// 💰 Here's an example of how you use this:
// const {promise, resolve, reject} = deferred()
// promise.then(() => {/* do something */})
// // do other setup stuff and assert on the pending state
// resolve()
// await promise
// // assert on the resolved state

describe('Location', () => {
  // 🐨 create a fakePosition object that has an object called "coords" with latitude and longitude
  const fakePosition = {
    coords: {latitude: 33, longitude: 34},
  }

  // 🐨 set window.navigator.geolocation to an object that has a getCurrentPosition mock function
  beforeAll(() => {
    window.navigator.geolocation = {
      getCurrentPosition: jest.fn(),
    }
  })

  it('displays the users current location', async () => {
    // 🐨 create a deferred promise here
    const {promise, resolve} = deferred()
    // 🐨 the first argument of your mock should accept a callback
    // 🐨 you'll call the callback when the deferred promise resolves
    // 💰 promise.then(() => {/* call the callback with the fake position */})
    // 🐨 Now we need to mock the geolocation's getCurrentPosition function
    window.navigator.geolocation.getCurrentPosition.mockImplementation(
      callback => {
        promise.then(() => callback(fakePosition))
      },
    )
    // 🐨 now that setup is done, render the Location component itself
    render(<Location />)
    // 🐨 verify the loading spinner is showing up
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
    // 🐨 resolve the deferred promise and wait for the promise to resolve
    // 💰 right around here, you'll notice an error log in the test output.
    // You can ignore that for now and just add this next line: act(() => {})
    await act(async () => {
      resolve()
      await promise
    })

    expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
    expect(screen.getByTestId(/latitude/i)).toHaveTextContent(
      `Latitude: ${fakePosition.coords.latitude}`,
    )
    expect(screen.getByTestId(/latitude/i)).toHaveTextContent(
      `Longitude: ${fakePosition.coords.longitude}`,
    )
  })
})

/*
eslint
  no-unused-vars: "off",
*/
