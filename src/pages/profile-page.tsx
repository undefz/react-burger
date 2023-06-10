import {NavLink, Outlet, useNavigate} from "react-router-dom";
import profileStyles from './profile-page-styles.module.css'
import {logout} from "../services/actions/user";
import {useAppDispatch} from "../services/hooks";
export const ProfilePage = () => {
    const dispatch = useAppDispatch();
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
            <Outlet/>
        </div>
    )
}
