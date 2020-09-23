import React, { useEffect, useState } from 'react'
import { Table, Button, Navbar, Nav, NavItem, NavbarBrand } from 'reactstrap'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import './user.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import User from '../../../models/User'
import UserService from '../../../_services/user/userService';
const ListUser = () => {
  const [users, setUsers] = useState<User[]>([])
  const userService = new UserService();

  useEffect(() => {
    let findUser = true;
    try {
      userService.getUsers().then(users => {
        if (findUser) {
          setUsers(users);
        }
      }).catch((error: string) => {
        alert(error)
      });
    } catch (error) {
      alert(error);
    }

    return function cleanup() {
      findUser = false
    }

  }, [userService])

  function getUsers() {
    try {
      userService.getUsers().then(users => {
        setUsers(users);
      });
    } catch (error) {
      alert(error);
    }
  }

  const deleteBy = async (event: any, id: number) => {
    event.persist()
    try {
      userService.delete(id).then(() => {
        getUsers()
      });
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="body">

      <Navbar color="dark" dark>
        <NavbarBrand href="/user/list">Usuários</NavbarBrand>
        <Nav>
          <NavItem>
            <Link to="/user/create" className="btn btn-primary link-menu">Novo</Link>
          </NavItem>
        </Nav>
      </Navbar>

      <Table bordered>
        <thead>
          <tr>
            <th className="cabecalho">ID</th>
            <th className="cabecalho">Nome</th>
            <th className="cabecalho">Email</th>
            <th className="cabecalho">Login</th>
            <th className="cabecalho">Ação</th>
          </tr>
        </thead>
        {users.map(user => (
          <tbody key={user._id}>
            <tr>
              <th scope="row" >{user._id}</th>
              <td className="row_center" style={{ width: '20%' }}>{user.name}</td>
              <td className="row_center" style={{ width: '25%' }}>{user.email}</td>
              <td className="row_center" style={{ width: '15%' }}>{user.login}</td>
              <td><div className="ml-auto">
                <Link className="btn btn-warning mr-1"
                  to={`/user/edit/${user._id}`}>Editar</Link>
                <Button color="danger"
                  onClick={e => deleteBy(e, user._id)}>Remover</Button>
              </div></td>
            </tr>
          </tbody>
        ))}
      </Table>

      <footer>
        <Link to="/dashboard">
          <FiArrowLeft />
                Voltar
        </Link>
      </footer>
    </div>
  )
}

export default ListUser
