import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import styles from './common-styles.module.css';

export const LoginPage = () => {
    return (
        <div className={styles.centered}>
            <h1 className="mb-6 text text_type_main-large">Вход</h1>
            <EmailInput value="" onChange={e => {
            }} extraClass="mb-6"/>
            <PasswordInput value="" onChange={e => {
            }} extraClass="mb-6"/>
            <Button htmlType="button" size="medium" extraClass="mb-20">Войти</Button>
            <div className={styles.links}>
                <p className="mb-4 text text_type_main-default">Вы - новый пользователь? <Link to="/register" className={styles.link}>Зарегестрироваться</Link></p>
                <p className="text text_type_main-default">Забыли пароль? <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link></p>
            </div>
        </div>
    );
}