import api from '../api'
import { getToken } from '../auth'

export class LoginService {
  // eslint-disable-next-line
  constructor() { }

  async login(credentialsCrypto) {
    try {
      await api.get('authenticate', {
        headers: {
          Authorization: `Basic ${credentialsCrypto}`
        }
      }).then(logged => {
        localStorage.setItem('token', logged.data.token)
        localStorage.setItem('token-valid', 'true')
      })
    } catch (error) {
      alert('Login ou Senha inválido.')
    }
  }

  async tokenValid() {
    try {
      const valid = await api.get('token-valid', {
        headers: {
          Authorization: `Basic ${getToken()}`
        }
      }).then(logged => {
        localStorage.setItem('token-valid', logged.data)
        return logged.data
      })
      return valid
    } catch (error) {
      localStorage.setItem('token-valid', error.data)
      return false
    }
  }
}

export default LoginService
