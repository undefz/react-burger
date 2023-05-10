import {NavLink} from "react-router-dom";
import {EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import profileStyles from './profile-page-styles.module.css'
export const ProfilePage = () => {
    return (
        <div className={profileStyles.profileContainer}>
            <div className={profileStyles.linksContainer}>
                <NavLink className={profileStyles.sideLink} to={"/profile"}>Профиль</NavLink>
                <NavLink className={profileStyles.sideLink} to={"/profile/orders"}>История заказов</NavLink>
                <NavLink className={profileStyles.sideLink} to={""}>Выход</NavLink>
                <span className={profileStyles.sideComment}>В этом разделе вы можете изменить свои персональные данные</span>
            </div>
            <div className={"profileData"}>
                <Input value="" placeholder="Имя" extraClass="mb-6"/>
                <EmailInput value="" onChange={e => {
                }} extraClass="mb-6"/>
                <PasswordInput value="" onChange={e => {
                }} extraClass="mb-6"/>
            </div>
        </div>
    )
}