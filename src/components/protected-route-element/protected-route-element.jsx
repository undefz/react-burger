import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import React from "react";
import {useLocation} from "react-router";
import PropTypes from "prop-types";

export const ProtectedRouteElement = ({checkAuth = true, element}) => {
    const { isAuthed } = useSelector(state => state.user);
    const location = useLocation()


    if (checkAuth) {
        return isAuthed ? element : <Navigate to="/login" state={{returnTo: location.pathname}}/>;
    } else {
        if (isAuthed) {
            return <Navigate to={location.state?.returnTo || '/'}/>;
        } else {
            return element;
        }
    }
}

ProtectedRouteElement.propTypes = {
    checkAuth: PropTypes.bool,
    element: PropTypes.element
}