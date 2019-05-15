import { validateRect, validateVideo } from './validate.helper'

describe('Helper >> validate.helper test', () => {
  it('should return correct validate rect result', () => {
    const input = { x: null, y: null, width: null, height: null }
    const expected = {
      errors: {
        x: { onoff: true, message: 'Invalid input' },
        y: { onoff: true, message: 'Invalid input' },
        width: { onoff: true, message: 'Invalid input' },
        height: { onoff: true, message: 'Invalid input' }
      },
      isValid: true
    }
    expect(validateRect(input)).toEqual(expected)
  })

  it('should return correct validate video result', () => {
    const input = { width: null, height: null }
    const expected = {
      errors: {
        width: { onoff: true, message: 'Invalid input' },
        height: { onoff: true, message: 'Invalid input' }
      },
      isValid: true
    }
    expect(validateVideo(input)).toEqual(expected)
  })
})
