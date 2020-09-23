import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavbarBrand } from 'reactstrap';

import './header.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const Header = () => {
    function logout() {
        localStorage.clear();
    }

    return (
        <div id="header" className="body">

            <Navbar color="dark" dark>
                <NavbarBrand href="/dashboard">Inicio</NavbarBrand>
                <Nav>
                    <NavItem>
                        <Link to="/user/list" className="btn btn-primary link-menu">Usuários</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/" onClick={() => logout()} className="btn btn-secondary link-menu">Sair</Link>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    );
};

export default Header;