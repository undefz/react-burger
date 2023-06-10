import {TIngredient, TOrder} from "../../utils/burger-prop-types";
import styles from "./order-card.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useMemo} from "react";
import {useAppSelector} from "../../services/hooks";

export const OrderCard = ({order}: { order: TOrder }) => {
    const allIngredients = useAppSelector(state => state.ingredients.items)

    const ingredientItems: Array<TIngredient> = useMemo(() => {
        return order.ingredients.map(id =>
            allIngredients.find(x => x._id === id)
        ).filter((x): x is TIngredient => x !== undefined)
    }, [allIngredients, order.ingredients]);

    const calculatePrice = useMemo(() => {
        return ingredientItems
            .map(x => x === undefined ? 0 : x.price)
            .reduce((a, b) => a + b, 0)
    }, [ingredientItems]);

    return (
        <div className={styles.orderCard}>
            <div className={styles.detailsBlock}>
                <div className={styles.topBlock}>
                    <p className={styles.orderNumber}>#{order.number}</p>
                    <FormattedDate className={styles.date} date={new Date(order.createdAt)}/>
                </div>
                <p className={styles.orderName}>{order.name}</p>
                <div className={styles.bottomBlock}>
                    <IngredientStack ingredients={ingredientItems}/>
                    <OrderPrice price={calculatePrice}/>
                </div>
            </div>
        </div>
    );
}

const IngredientStack = ({ingredients}: { ingredients: Array<TIngredient> }) => {
    const count = ingredients.length;
    const extraLength = Math.max(count - 6, 0);

    const shownIngredients = ingredients.slice(0, 6)

    return <div className={styles.ingredientStack}>
        {
            shownIngredients.map((x, index) =>
                <IngredientImage key={index} ingredient={x} extraCount={index === 0 ? extraLength : 0}/>
            )
        }
    </div>
}

const IngredientImage = ({ingredient, extraCount}: { ingredient: TIngredient, extraCount: number }) => {
    return (
        <div className={styles.child}>
            <img className={`${styles.circling}`} src={ingredient.image_mobile} alt={ingredient.name}/>
            {extraCount > 0 && (<p className={styles.imageText}>+{extraCount}</p>)}
        </div>
    )
}

const OrderPrice = ({price}: { price: number }) => {
    return <div className={styles.priceBlock}>
        <p>{price}</p>
        <CurrencyIcon type="primary"/>
    </div>
}