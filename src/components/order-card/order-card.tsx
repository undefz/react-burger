import {TIngredient, TOrder} from "../../utils/burger-prop-types";
import styles from "./order-card.module.css";
import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useMemo} from "react";
import {useAppSelector} from "../../services/hooks";
import {PriceWithMultiplier} from "../price-with-multiplier/price-with-multiplier";
import {IngredientIcon} from "../ingredient-icon/ingredient-icon";
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router";
import {getStatusName} from "../../utils/utils";

export const OrderCard = ({order, showStatus}: { order: TOrder, showStatus: boolean }) => {
    const navigate = useNavigate();
    const location = useLocation();

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

    const onItemClick = () => {
        navigate(`${order.number}`, {state: {backgroundLocation: location}})
    }

    const status = getStatusName(order.status)

    return (
        <div className={styles.orderCard} onClick={onItemClick}>
            <div className={styles.detailsBlock}>
                <div className={styles.topBlock}>
                    <p className={styles.orderNumber}>#{order.number}</p>
                    <FormattedDate className={styles.date} date={new Date(order.createdAt)}/>
                </div>
                <p className={styles.orderName}>{order.name}</p>
                {showStatus && <p className={styles.status}>{status}</p>}
                <div className={styles.bottomBlock}>
                    <IngredientStack ingredients={ingredientItems}/>
                    <PriceWithMultiplier price={calculatePrice}/>
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
                <div key={index} className={styles.child}>
                    <IngredientIcon ingredient={x} extraCount={index === 0 ? extraLength : 0}/>
                </div>
            )
        }
    </div>
}
