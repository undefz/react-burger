import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import {orderHistoryActions} from "../../services/actions/order-history";
import {OrderList} from "../order-list/order-list";

export const ProfileOrders = () => {
    const dispatch = useAppDispatch();
    const orderHistory = useAppSelector(state => state.orderHistory)


    useEffect(() => {
        const token = localStorage.getItem('token')
        const url = `wss://norma.nomoreparties.space/orders?token=${token}`

        dispatch(orderHistoryActions.wsInit(url))
        return () => {
            dispatch(orderHistoryActions.wsClose())
        }
    }, [dispatch])

    return (
        <div>
            <OrderList orders={orderHistory.orders}/>
        </div>
    );
}