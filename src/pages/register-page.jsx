import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import styles from "./common-styles.module.css";

export const RegisterPage = () => {
    return (
        <div className={styles.centered}>
            <h1 className="mb-6 text text_type_main-large">Регистрация</h1>
            <Input value="" placeholder="Имя" extraClass="mb-6"/>
            <EmailInput value="" onChange={e => {
            }} extraClass="mb-6"/>
            <PasswordInput value="" onChange={e => {
            }} extraClass="mb-6"/>
            <Button htmlType="button" size="medium" extraClass="mb-20">Зарегестрироваться</Button>
            <p className="mb-4 text text_type_main-default">Уже зарегестрированы? <Link to="/login" className={styles.link}>Войти</Link></p>
        </div>
    );
}