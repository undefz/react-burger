import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect, useState} from "react";
import {queryGetUser, queryPatchUser} from "../../utils/http";

export const ProfileEditor = () => {
    const [profileData, setProfileData] = useState(null);

    const [changed, setChanged] = useState(false);

    const reloadData = () => {
        queryGetUser()
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



    const changeName = (e) => {
        setProfileData({...profileData, name: e.target.value});
        setChanged(true);
    }

    const changeEmail = (e) => {
        setProfileData({...profileData, email: e.target.value});
        setChanged(true);
    }

    const saveProfileData = () => {
        queryPatchUser(profileData)
            .then(response => {
                if (response.success) {
                    console.log(`Данные обновлены ${JSON.stringify(response)}`);
                    setChanged(false);
                } else {
                    console.log(`Ошибка при обновлении профиля ${JSON.stringify(response)}`)
                }
            })
    }

    return (<div className={"profileData"}>
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
    </div>)
}