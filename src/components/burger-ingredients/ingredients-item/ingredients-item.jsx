import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredients-item.module.css"

export const IngredientItem = ({item, count}) => {
    return (
        <div className={styles.item}>
            {
                count > 0 ? <Counter extraClass= {styles.counter} count={count}/> : null
            }

            <img src={item.image} alt={item.name}/>
            <div className={styles.price}>
                <p>{item.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={styles.itemName}>{item.name}</p>
        </div>
    )
}