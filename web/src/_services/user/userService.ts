import api from '../api'
import { getToken } from '../auth'
import User from '../../models/User'

export class UserService {
  // eslint-disable-next-line
  constructor() { }

  async getUsers(): Promise<User[]> {
    try {
      const users = api.get('users', {
        headers: {
          Authorization: `Basic ${getToken()}`
        }
      }).then(users => {
        return users.data;
      }).catch(() => {
        alert('Nenhum registro encontrado.')
        return [];
      })
      return users;
    } catch (error) {
      return [];
    }
  }

  async delete(id: number) {
    try {
      await api.delete(`user/${id}`, {
        headers: {
          Authorization: `Basic ${getToken()}`
        }
      }).then(() => {
        alert('Registro removido com sucesso.')
      }).catch(error => {
        alert(error)
      })
    } catch (error) {
      alert('Ocorreu um erro ao remover o usuário.')
    }
  }
}

export default UserService
