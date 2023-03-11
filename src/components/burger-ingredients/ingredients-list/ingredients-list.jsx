import {IngredientItem} from "../ingredients-item/ingredients-item";
import styles from "./ingreidients-list.module.css"
export const IngredientsList = ({header, ingredientsList}) => {
    return (<>
        <h2 className={styles.ingredientsHeader}>{header}</h2>
        <div className={styles.ingredientsGrid}>
            {
                ingredientsList.map(item => (<IngredientItem item={item} count={1}/>))
            }
        </div>
    </>);
}