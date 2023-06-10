import {OrderCard} from "../order-card/order-card";
import {TOrder} from "../../utils/burger-prop-types";
import styles from "./order-list.module.css"
export const OrderList = ({orders}: { orders: Array<TOrder> }) => {
    return (
        <div className={styles.orderList}>
            {
                orders.map(order => <OrderCard key={order.number} order={order}/>)
            }
        </div>
    );
}