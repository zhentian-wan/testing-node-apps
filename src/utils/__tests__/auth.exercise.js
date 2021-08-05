// Testing Pure Functions
import {isPasswordAllowed} from '../auth'
import cases from 'jest-in-case'

describe('isPasswordAllowed', () => {
  const allowedPwds = ['!aBc123']
  const disallowedPwds = {
    'too short': 'a2c!',
    'no alphabet characters': '123456',
    'no numbers': 'ABCdef!',
    'no uppercase letters': 'abc123!',
    'no lowercase letters': 'ABC123!',
    'no non-alphanumeric characters': 'ABCdef123',
  }
  describe('Valid password', () => {
    allowedPwds.forEach((pwd) => {
      test(`allow ${pwd}`, () => {
        expect(isPasswordAllowed(pwd)).toBeTruthy()
      })
    })
  })
  describe('Invalid password', () => {
    Object.entries(disallowedPwds).forEach(([key, value]) => {
      test(`disallow - ${key}: ${value}`, () => {
        expect(isPasswordAllowed(value)).toBeFalsy()
      })
    })
  })
})

cases(
  'isPasswordAllowed: valid passwords',
  ({password}) => {
    expect(isPasswordAllowed(password)).toBe(true)
  },
  {
    'valid password': {
      password: '!aBc123',
    },
  },
)
/** Demo fro jest-in-case */
function casify(obj) {
  return Object.entries(obj).map(([name, password]) => ({
    name: `${password} - ${name}`,
    password,
  }))
}

cases(
  'isPasswordAllowed: valid passwords',
  ({password}) => {
    expect(isPasswordAllowed(password)).toBe(true)
  },
  casify({'valid password': '!aBc123'}),
)

cases(
  'isPasswordAllowed: invalid passwords',
  ({password}) => {
    expect(isPasswordAllowed(password)).toBe(false)
  },
  casify({
    'too short': 'a2c!',
    'no letters': '123456!',
    'no numbers': 'ABCdef!',
    'no uppercase letters': 'abc123!',
    'no lowercase letters': 'ABC123!',
    'no non-alphanumeric characters': 'ABCdef123',
  }),
)
