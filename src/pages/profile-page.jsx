import {NavLink, useNavigate} from "react-router-dom";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import profileStyles from './profile-page-styles.module.css'
import {useDispatch} from "react-redux";
import {logout} from "../services/actions/user";
import {useEffect, useState} from "react";
import {queryEndpoint} from "../utils/http";
export const ProfilePage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [profileData, setProfileData] = useState(null);

    const [changed, setChanged] = useState(false);

    const reloadData = () => {
        queryEndpoint('/auth/user', null, true, 'GET')
            .then(response => {
                if (response.success) {
                    setProfileData(response.user);
                    setChanged(false);
                }
            })
    }

    useEffect(() => {
        reloadData();
    }, [])

    const clickLogout = () => {
        dispatch(logout());
        navigate("/login");
    }

    const changeName = (e) => {
        setProfileData({...profileData, name: e.target.value});
        setChanged(true);
    }

    const changeEmail = (e) => {
        setProfileData({...profileData, email: e.target.value});
        setChanged(true);
    }

    const saveProfileData = () => {
        queryEndpoint('/auth/user', {...profileData}, true, 'PATCH')
            .then(response => {
                if (response.success) {
                    console.log(`Данные обновлены ${JSON.stringify(response)}`);
                } else {
                    console.log(`Ошибка при обновлении профиля ${JSON.stringify(response)}`)
                }
            })
    }

    return (
        <div className={profileStyles.profileContainer}>
            <div className={profileStyles.linksContainer}>
                <NavLink className={profileStyles.sideLink} to={"/profile"}>Профиль</NavLink>
                <NavLink className={profileStyles.sideLink} to={"/profile/orders"}>История заказов</NavLink>
                <p className={profileStyles.sideLink} onClick={clickLogout}>Выход</p>
                <span className={profileStyles.sideComment}>В этом разделе вы можете изменить свои персональные данные</span>
            </div>
            <div className={"profileData"}>
                <Input value={profileData ? profileData.name : ''} onChange={e => changeName(e)} placeholder="Имя" extraClass="mb-6"/>
                <EmailInput value={profileData ? profileData.email : ''} onChange={e => changeEmail(e)} extraClass="mb-6"/>
                <PasswordInput value="" onChange={e => {
                }} extraClass="mb-6"/>
                {
                    changed &&
                    <>
                        <Button htmlType="button" size="medium" extraClass="mb-20" onClick={saveProfileData}>Сохранить</Button>
                        <Button htmlType="button" size="medium" extraClass="mb-20 ml-5" onClick={reloadData}>Отменить</Button>
                    </>
                }
            </div>
        </div>
    )
}