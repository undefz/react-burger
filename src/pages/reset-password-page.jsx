import styles from "./common-styles.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {useState} from "react";

export const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");

    return (
        <div className={styles.centered}>
            <h1 className="mb-6 text text_type_main-large">Восстановление пароля</h1>
            <PasswordInput
                placeholder="Введите новый пароль"
                value={password}
                name={'password'}
                onChange={e => {setPassword(e.target.value)}}
                extraClass="mb-6"
            />
            <Input value="" placeholder="Введите код из письма" extraClass="mb-6"/>
            <Button htmlType="button" size="medium" extraClass="mb-20">Сохранить</Button>
            <p className="mb-4 text text_type_main-default">Вспомнили пароль? <Link to="/login" className={styles.link}>Войти</Link></p>
        </div>
    );
}