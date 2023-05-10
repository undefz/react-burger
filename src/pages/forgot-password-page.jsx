import styles from "./common-styles.module.css";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

export const ForgotPasswordPage = () => {
    return (
        <div className={styles.centered}>
            <h1 className="mb-6 text text_type_main-large">Восстановление пароля</h1>
            <EmailInput value="" placeholder="Укажите e-mail" onChange={e => {
            }} extraClass="mb-6"/>
            <Button htmlType="button" size="medium" extraClass="mb-20">Восстановить</Button>
            <p className="mb-4 text text_type_main-default">Вспомнили пароль? <Link to="/login" className={styles.link}>Войти</Link></p>
        </div>
    );
}