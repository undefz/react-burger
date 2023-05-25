import React, {ReactElement} from 'react'
import styles from "./app-header.module.css";
import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";

type TMenuItemProps = {
    link: string;
    icon: (isActive: boolean) => ReactElement;
    text: string;
}
export const MenuItem = ({link, icon, text}: TMenuItemProps) => {
    const location = useLocation();
    const isActive = link === "/"
        ? location.pathname === link
        : location.pathname.startsWith(link);

    return (
        <Link to={link} className={styles.link}>
            <div className={styles.menuItem}>
                {icon(isActive)}
                <p className={'text text_type_main-default ml-2 ' + (isActive ? 'text_color_primary' : '')}>{text}</p>
            </div>
        </Link>
    );
}

export const AppHeader = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <div className={`${styles.twoBox} ${styles.first}`}>
                        <li>
                            <MenuItem link='/' icon = {active => <BurgerIcon type={active ? 'primary' : 'secondary'}/>} text='Конструктор'/>
                        </li>
                        <li>
                            <MenuItem link='/feed' icon = {active => <ListIcon type={active ? 'primary' : 'secondary'}/>} text='Лента заказов'/>
                        </li>
                    </div>
                    <li className={styles.menuItem}>
                        <Logo/>
                    </li>
                    <li className={`${styles.menuItem} ${styles.last}`}>
                        <MenuItem link='/profile/' icon = {active => <ProfileIcon type={active ? 'primary' : 'secondary'}/>} text='Личный кабинет'/>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default AppHeader;