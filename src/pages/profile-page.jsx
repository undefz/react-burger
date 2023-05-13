import {NavLink, useNavigate} from "react-router-dom";
import profileStyles from './profile-page-styles.module.css'
import {useDispatch} from "react-redux";
import {logout} from "../services/actions/user";
export const ProfilePage = ({children}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const clickLogout = () => {
        dispatch(logout());
        navigate("/login");
    }

    return (
        <div className={profileStyles.profileContainer}>
            <div className={profileStyles.linksContainer}>
                <NavLink className={({isActive}) => isActive ? profileStyles.sideActiveLink : profileStyles.sideLink} to={"/profile/"}>
                    Профиль
                </NavLink>
                <NavLink className={({isActive}) => isActive ? profileStyles.sideActiveLink : profileStyles.sideLink} to={"/profile/orders"}>
                    История заказов
                </NavLink>
                <p className={profileStyles.sideLink} onClick={clickLogout}>Выход</p>
                <span className={profileStyles.sideComment}>В этом разделе вы можете изменить свои персональные данные</span>
            </div>
            {children}
        </div>
    )
}