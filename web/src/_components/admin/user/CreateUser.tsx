import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Form, FormGroup, Label, Input, Button, Container } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import api from '../../../_services/api';
import { getToken } from '../../../_services/auth';

import './user.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export const CreateCategory = () => {

    const history = useHistory();

    const [inputData, setInputData] = useState({
        login: '',
        password: '',
        name: '',
        email: '',
    });

    function changeInput(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setInputData({ ...inputData, [name]: value });
    }

    async function changeForm(event: FormEvent) {
        event.preventDefault();

        const { login, password, name, email } = inputData;

        const data = { login, password, name, email };

        await api.post('user', data, {
            headers: {
                'Authorization': `Basic ${getToken()}`
            },
        });

        alert('Usuário Cadastrado com Sucesso!')

        history.goBack();
    }

    function cancel() {
        history.goBack();
    }

    return (
        <Container>
            <div id="page-create-user" className="body_form">
                <Form onSubmit={changeForm}>
                    <FormGroup>
                        <Label className="strong">Nome:</Label>
                        <Input
                            id="nome"
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
                    <Button type="submit">Salvar</Button>
                </Form>
            </div>
        </Container>
    )
}
export default CreateCategory;
