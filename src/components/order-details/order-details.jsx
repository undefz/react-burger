import doneImagePath from "../../images/done.svg"
import styles from "./order-details.module.css"
const OrderDetails = () => {
    return (
        <div className={`${styles.orderContainer} mt-30 mb-30`}>
            <h1 className="text text_type_digits-large text_color_primary">035682</h1>
            <p className="text text_type_main-medium">Идентификатор заказа</p>
            <img className="mt-15 mb-15" src={doneImagePath} alt="Done"/>
            <p className="text text_type_main-default text_color_primary">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    );
}

export default OrderDetails;