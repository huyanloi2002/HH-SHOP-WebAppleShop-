import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
    const { isAuthenticated, loading, user } = useSelector(state => state.auth)
    console.log(user)
    return (
        <React.Fragment>
            {loading === false && (
                <Route
                    {...rest}
                    render={props => {
                        if (isAuthenticated === false) {
                            return <Redirect to='/login' />
                        }
                        if (isAdmin === true && user.role !== 'admin') {
                            return <Redirect to='/' />
                        }
                        return <Component {...props} />
                    }}
                />
            )}
        </React.Fragment>
    );
}

export default ProtectedRoute;
