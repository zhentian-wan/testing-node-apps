import {UnauthorizedError} from 'express-jwt'
import errorMiddleware from '../error-middleware'
import {buildNext, buildRes} from 'utils/generate'

// 🐨 Write a test for the UnauthorizedError case
// 💰 const error = new UnauthorizedError('some_error_code', {message: 'Some message'})
// 💰 const res = {json: jest.fn(() => res), status: jest.fn(() => res)}

// 🐨 Write a test for the headersSent case
describe('errorMiddleware', () => {
  test('if res.headersSent, then pass down error', () => {
    const res = buildRes({headersSent: true})
    const next = buildNext()
    const error = new Error('error')
    errorMiddleware(error, null, res, next)
    expect(next).toHaveBeenCalledWith(error)
    expect(next).toHaveBeenCalledTimes(1)
    expect(res.json).not.toHaveBeenCalled()
    expect(res.status).not.toHaveBeenCalled()
  })

  test('error is UnauthorizedError', () => {
    const code = 'some_code'
    const message = 'Unauthorized'
    const error = new UnauthorizedError(code, {
      message,
    })
    // return res itself so that response are chainable
    // res.status().json()
    const res = buildRes()
    const next = buildNext()
    errorMiddleware(error, null, res, next)
    expect(next).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({
      code: error.code,
      message: error.message,
    })
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  test('return 500 error', () => {
    const res = buildRes()
    const error = new Error('Server error')
    const next = buildNext()
    errorMiddleware(error, null, res, next)
    expect(next).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Server error',
      stack: error.stack,
    })
    expect(res.json).toHaveBeenCalledTimes(1)
  })
})
