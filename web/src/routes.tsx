import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from './_services/auth';

import Login from './_components/public/login/Login';
import Dashboard from './_components/admin/dashboard/Dashboard';
import ListUser from './_components/admin/user/ListUser';
import CreateUser from './_components/admin/user/CreateUser';
import EditUser from './_components/admin/user/EditUser';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
                <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            )
    )} />
)

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={Login} path="/" exact />
                <PrivateRoute component={Dashboard} path="/dashboard" exact />
                <PrivateRoute component={ListUser} path="/user/list" />
                <PrivateRoute component={CreateUser} path="/user/create" />
                <PrivateRoute component={EditUser} path="/user/edit/:id" />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;