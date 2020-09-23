import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Container } from 'reactstrap';
import './login.css';
import LoginService from '../../../_services/login/loginService';

const Login = () => {

    const loginService = new LoginService();
    const history = useHistory();

    const [inputData, setInputData] = useState({
        username: '',
        password: '',
    });

    function changeInput(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setInputData({ ...inputData, [name]: value });
    }

    async function changeForm(event: FormEvent) {
        event.preventDefault();

        const {
            username,
            password,
        } = inputData;

        const credentialsCrypto = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
        try {
            await loginService.login(credentialsCrypto);
            history.push('/dashboard');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div id="page-login">
            <Container>
                <div id="page-create-user" className="body_form">
                    <Form onSubmit={changeForm}>
                        <FormGroup>
                            <Label className="strong">Login:</Label>
                            <Input
                                id="username"
                                type="text"
                                name="username"
                                placeholder="Login"
                                maxLength={11}
                                required
                                onChange={changeInput}></Input>

                            <Label className="strong">Senha:</Label>
                            <Input
                                id="nome"
                                type="password"
                                name="password"
                                placeholder="Senha"
                                required
                                onChange={changeInput}></Input>
                        </FormGroup>

                        <Link id="cancelar" to="/" className="btn btn-primary link-menu">Cancelar</Link>
                        <Button type="submit">Logar</Button>
                    </Form>

                </div>
            </Container>
        </div>
    );
};

export default Login;