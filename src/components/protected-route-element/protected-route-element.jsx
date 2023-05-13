import {Navigate, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export const ProtectedRouteElement = ({checkAuth = true, element}) => {
    const navigate = useNavigate();

    const { isAuthed } = useSelector(state => state.user);

    if (checkAuth) {
        return isAuthed ? element : <Navigate to="/login" replace/>;
    } else {
        if (isAuthed) {
            navigate(-1);
            return null;
        } else {
            return element;
        }
    }
}