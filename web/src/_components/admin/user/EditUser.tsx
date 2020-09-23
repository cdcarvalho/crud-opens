import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { useHistory, useParams } from 'react-router-dom'
import api from '../../../_services/api'
import { getToken } from '../../../_services/auth'

export const EditCategory = () => {
  const history = useHistory()
  const { id } : any = useParams();

  const [inputData, setInputData] = useState({
    login: '',
    password: '',
    name: '',
    email: '',
  })

  function changeInput(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setInputData({ ...inputData, [name]: value })
  }

  async function changeForm(event: FormEvent) {
    event.preventDefault()

    const {
      login,
      password,
      name,
      email
    } = inputData

    const data = {
      login,
      password,
      name,
      email
    }

    await api.put(`user/${id}`, data, {
      headers: {
        Authorization: `Basic ${getToken()}`
      }
    })

    alert('Usuário Alterado com Sucesso!')

    history.goBack()
  }

  useEffect(() => {
    loadUser(id)
  }, [id])

  async function loadUser(id: string) {
    const response = await api.get(`user/${id}`, {
      headers: {
        Authorization: `Basic ${getToken()}`
      }
    })

    const user = {
      login: response.data.login,
      password: response.data.password,
      name: response.data.name,
      email: response.data.email
    }

    setInputData(user)
  }

  function cancel() {
    history.goBack()
  }

  return (
    <div id="page-create-user" className="body_form">
      <Form onSubmit={changeForm}>
        <FormGroup>
          <Label className="strong">Nome:</Label>
          <Input
            id="name"
            type="text"
            name="name"
            placeholder="Nome"
            value={inputData.name}
            required
            onChange={changeInput}></Input>

          <Label className="strong">Email:</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={inputData.email}
            onChange={changeInput}></Input>

          <Label className="strong">Login:</Label>
          <Input
            id="login"
            type="text"
            name="login"
            placeholder="Login"
            maxLength={11}
            value={inputData.login}
            required
            onChange={changeInput}></Input>

          <Label className="strong">Senha:</Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Senha"
            value={inputData.password}
            required
            onChange={changeInput}></Input>
        </FormGroup>

        <Button id="cancelar" onClick={cancel}>Cancelar</Button>
        <Button type="submit">Alterar</Button>
      </Form>
    </div>
  )
}
export default EditCategory
