import LoginService from './login/loginService';

const loginService = new LoginService();

let valid;

export const getToken = () => localStorage.getItem('token');
export const isAuthenticated = () => {
    setInterval(isValid, 50000);
    if (localStorage.getItem('token-valid') !== 'true') {
        alert('Sessão expirada. Faça o login novamente!')
        return false;
    }
    return true;
}

const isValid = async () => {
    valid = await loginService.tokenValid();
    return valid
}