import {TIngredient, TOrder} from "../../utils/burger-prop-types";
import {useAppSelector} from "../../services/hooks";
import {useEffect, useMemo, useState} from "react";
import {IngredientIcon} from "../ingredient-icon/ingredient-icon";
import {PriceWithMultiplier} from "../price-with-multiplier/price-with-multiplier";
import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useParams} from "react-router";
import styles from "./order-details.module.css"
import {queryGetOrder} from "../../utils/http";
import {getStatusName} from "../../utils/utils";


type TOrderDetailsParams = {
    id: string
}

type GroupedIngredients = {
    [key: string]: [TIngredient, number]
}
export const OrderDetails = () => {
    const {id} = useParams<TOrderDetailsParams>();

    const state = useAppSelector(state => state)

    const [order, setOrder] = useState<TOrder>()

    useEffect(() => {
        if (id) {
            const number = Number(id)
            queryGetOrder(number)
                .then(r => {
                    console.log(`Получили на ${id} ${JSON.stringify(r)}`)
                    const found = r.find(x => x.number === number)
                    if (found) {
                        setOrder(found);
                    }
                })
                .catch(e => console.log(`Ошибочка ${e}`))
        }
    }, [id])

    const ingredientItems: Array<TIngredient> = useMemo(() => {
        if (!order) {
            return []
        }

        return order.ingredients.map(id =>
            state.ingredients.items.find(x => x._id === id)
        ).filter((x): x is TIngredient => x !== undefined)
    }, [state.ingredients.items, order]);

    const ingredientsCount = useMemo(() => {
        const group: GroupedIngredients = {}
        for (const x of ingredientItems) {
            const current = group[x._id]
            if (current) {
                group[x._id] = [x, current[1] + 1]
            } else {
                group[x._id] = [x, 1]
            }
        }
        return group
    }, [ingredientItems])

    const price = useMemo(() => {
        return ingredientItems.map(x => x.price).reduce((a, b) => a + b, 0);
    }, [ingredientItems])

    if (!order) {
        return null
    }

    const status = getStatusName(order.status)

    return (
        <div>
            <p className={styles.orderNumber}>#{order.number}</p>
            <h1 className={styles.orderName}>{order.name}</h1>
            <p className={styles.orderStatus}>{status}</p>
            <p className={styles.orderName}>Состав:</p>

            <div className={styles.ingredientsBox}>
                {
                    Object.values(ingredientsCount).map(([ingredient, count]) => {
                        return (<IngredientWithCount key={ingredient._id} ingredient={ingredient} count={count}/>)
                    })

                }
            </div>
            <div className={styles.bottomBar}>
                <FormattedDate className={styles.date} date={new Date(order.createdAt)}/>
                <PriceWithMultiplier price={price}/>
            </div>
        </div>
    )
}

const IngredientWithCount = ({ingredient, count}: { ingredient: TIngredient, count: number }) => {
    return (
        <div className={styles.ingredientBox}>
            <IngredientIcon ingredient={ingredient}/>
            <p className={styles.ingredientName}>{ingredient.name}</p>
            <PriceWithMultiplier price={ingredient.price} multiplier={count}/>
        </div>
    )
}