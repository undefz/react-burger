import styles from "./price-with-multiplier.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export const PriceWithMultiplier = ({price, multiplier = 1}: { price: number, multiplier?: number }) => {
    return <div className={styles.priceBlock}>
        <p>{multiplier !== 1 ? `${multiplier} x ` : ''}{price}</p>
        <CurrencyIcon type="primary"/>
    </div>
}