
import { validateCapitalChar, validateLowerChar, validateLengthPassword, validateSpecialChar, validateDigit, validatePasswordSpaces, validateEmailFormat, validateNoSpaces, validateHasDomain, validateContainsAtSymbol } from '../src/views/authorization/log-in/Validate-Login';

describe('Validation login', () => {
  describe('Password validation', () => {
  it('Should validate capital char', () => {
    expect(validateCapitalChar('Angelinka')).toBeTruthy()
    expect(validateCapitalChar('angelinka')).toBeFalsy()
  })

  it('Should validate lower char', () => {
    expect(validateLowerChar('aFGSFJHS')).toBeTruthy()
    expect(validateLowerChar('HDHDHHGDHG')).toBeFalsy()
  })

  it('Should validate password length', () => {
    expect(validateLengthPassword('aFG')).toBeFalsy()
    expect(validateLengthPassword('a')).toBeFalsy()
    expect(validateLengthPassword('HDHDHHGDHGgf')).toBeTruthy()
    expect(validateLengthPassword('HDHDHHGDHGgjsdhjhf')).toBeTruthy()
  })

  it('Should validate special char', () => {
    expect(validateSpecialChar('aFGSFJHS@')).toBeTruthy()
    expect(validateSpecialChar('aFGSFJHS^')).toBeTruthy()
    expect(validateSpecialChar('HDHDHHGDHG')).toBeFalsy()
  })

  it('Should validate digit', () => {
    expect(validateDigit('aFGSFJHS1')).toBeTruthy()
    expect(validateDigit('HDHDHHGDHG')).toBeFalsy()
  })

  it('Should validate password spaces', () => {
    expect(validatePasswordSpaces('aFGSFJHS1')).toBeTruthy()
    expect(validatePasswordSpaces(' HDHDHHGDHG')).toBeFalsy()
    expect(validatePasswordSpaces(' HDHDHHGDHG ')).toBeFalsy()
    expect(validatePasswordSpaces('HDHDHHGDHG ')).toBeFalsy()
  })
  })

  describe('Email validation', () => {
    it('Should validate correct email format', () => {
      expect(validateEmailFormat('angjdk@gmail.com')).toBeTruthy()
      expect(validateEmailFormat('hdjshdj')).toBeFalsy()
      expect(validateEmailFormat('dhsgdh.com')).toBeFalsy()
    })

    it('Should validate email spaces', () => {
      expect(validateNoSpaces('angjdk@gmail.com')).toBeTruthy()
      expect(validateNoSpaces(' hdjshdj')).toBeFalsy()
      expect(validateNoSpaces('dhsgdh.com ')).toBeFalsy()
    })

    
    it('Should contained domain', () => {
      expect(validateHasDomain('angjdk@gmail.com')).toBeTruthy()
      expect(validateHasDomain(' hdjshdj')).toBeFalsy()
      expect(validateHasDomain('dhsgdh.com ')).toBeFalsy()
    })
       
    it('Should include @ symbol', () => {
      expect(validateContainsAtSymbol('angjdk@gmail.com')).toBeTruthy()
      expect(validateContainsAtSymbol(' hdjshdj')).toBeFalsy()
      expect(validateContainsAtSymbol('dhsgdh.com ')).toBeFalsy()
    })

  })
})
