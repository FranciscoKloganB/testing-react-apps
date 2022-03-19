import * as faker from 'faker'

export function getCredentials() {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password()
  }
}
