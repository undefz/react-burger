import React from 'react'
import styles from "./app-header.module.css";
import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const AppHeader = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <div className={styles.twoBox}>
                        <li className={styles.menuItem}>
                            <BurgerIcon type="primary"/>
                            <p className="text text_type_main-default ml-2">Конструктор</p>
                        </li>
                        <li className={styles.menuItem}>
                            <ListIcon type="primary"/>
                            <p className="text text_type_main-default ml-2">Лента заказов</p>
                        </li>
                    </div>
                    <li className={styles.menuItem}>
                        <Logo/>
                    </li>
                    <li className={styles.menuItem}>
                        <ProfileIcon type="primary"/>
                        <p className="text text_type_main-default ml-2">Личный кабинет</p>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default AppHeader;