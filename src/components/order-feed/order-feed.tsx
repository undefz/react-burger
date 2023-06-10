import React, {useEffect, useMemo} from "react";
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import {feedActions} from "../../services/actions/feed";
import styles from "./order-feed.module.css"
import {OrderList} from "../order-list/order-list";

export const OrderFeed = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(feedActions.wsInit('wss://norma.nomoreparties.space/orders/all'))
        return () => {
            dispatch(feedActions.wsClose())
        }
    }, [dispatch])

    const feed = useAppSelector(state => state.feed)

    const doneOrders = useMemo(() => {
        return feed.orders.filter(order => order.status === 'done').map(order => order.number)
    }, [feed.orders])
    const preparingOrders = useMemo(() => {
        return feed.orders.filter(order => order.status !== 'done').map(order => order.number)
    }, [feed.orders])


    return (
        <>
            <h1 className={`${styles.sectionHeader} mt-10 mb-4`}>Лента заказов</h1>
            <div className={styles.orderView}>
                <OrderList orders={feed.orders}/>
                <div>
                    <div className={styles.orderByStatus}>
                        <div>
                            <p className={styles.statusTitle}>Готовы:</p>
                            <div className={styles.orderNumbers}>
                                {
                                    doneOrders.map(orderId => (<p key={orderId} className={styles.orderNumberDone}>{orderId}</p>))
                                }
                            </div>
                        </div>
                        <div>
                            <p className={styles.statusTitle}>В работе:</p>
                            <div className={styles.orderNumbers}>
                                {
                                    preparingOrders.map(orderId => (<p key={orderId} className={styles.orderNumberProgress}>{orderId}</p>))
                                }
                            </div>
                        </div>
                    </div>
                    <h1>Выполнено за все время</h1>
                    <p className={styles.statisticNumberBig}>{feed.total}</p>
                    <h1>Выполнено за сегодня</h1>
                    <p className={styles.statisticNumberBig}>{feed.totalToday}</p>
                </div>
            </div>
        </>
    );
}