import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {queryGetUser, queryPatchUser} from "../../utils/http";
import {TProfileData} from "../../utils/burger-prop-types";

export const ProfileEditor = () => {
    const [profileData, setProfileData] = useState<TProfileData>({name: "", email: "", password: ""});

    const [changed, setChanged] = useState(false);

    const reloadData = () => {
        queryGetUser()
            .then(user => {
                setProfileData(user);
                setChanged(false);
            })
    }

    useEffect(() => {
        reloadData();
    }, [])


    const changeName = (e: ChangeEvent<HTMLInputElement>) => {
        setProfileData({...profileData, name: e.target.value});
        setChanged(true);
    }

    const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setProfileData({...profileData, email: e.target.value});
        setChanged(true);
    }

    const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setProfileData({...profileData, password: e.target.value});
        setChanged(true);
    }

    const saveProfileData = (e: FormEvent) => {
        e.preventDefault();
        queryPatchUser(profileData)
            .then(response => {
                    console.log(`Данные обновлены ${JSON.stringify(response)}`);
                    setChanged(false);
                }
            ).catch(e => {
            console.log(`Ошибка при обновлении профиля ${JSON.stringify(e)}`)
        })
    }

    return (<div className={"profileData"}>
        <form onSubmit={saveProfileData}>
            <Input value={profileData?.name || ''} onChange={changeName} placeholder="Имя" extraClass="mb-6"/>
            <EmailInput value={profileData?.email || ''} onChange={changeEmail} extraClass="mb-6"/>
            <PasswordInput value={profileData?.password || ''} onChange={changePassword} extraClass="mb-6"/>
            {
                changed &&
                <>
                    <Button htmlType="submit" size="medium" extraClass="mb-20">Сохранить</Button>
                    <Button htmlType="button" size="medium" extraClass="mb-20 ml-5"
                            onClick={reloadData}>Отменить</Button>
                </>
            }
        </form>
    </div>)
}