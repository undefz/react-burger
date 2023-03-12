import styles from "./ingredient-details.module.css"
import {INGREDIENT} from "../../utils/burger-prop-types";

const IngredientDetails = ({ingredient}) => {
    return (
        <div className={`${styles.detailsMain}`}>
            <h1 className={styles.detailsHeader}>Детали ингредиента</h1>
            <img src={ingredient.image_large} alt={ingredient.name}/>
            <p className={styles.detailsText}>{ingredient.name}</p>
            <div className={`${styles.ingredientList} mb-10`}>
                <IngredientField name="Калории, ккал" value={ingredient.calories}/>
                <IngredientField name="Белки, г" value={ingredient.proteins}/>
                <IngredientField name="Жиры, г" value={ingredient.fat}/>
                <IngredientField name="Углеводы, г" value={ingredient.carbohydrates}/>
            </div>
        </div>
    );
}

const IngredientField = ({name, value}) => {
    return (
        <div className={styles.ingredientField}>
            <p className={styles.ingredientFieldDescription}>{name}</p>
            <p className={styles.ingredientFieldNumber}>{value}</p>
        </div>
    );
}

IngredientDetails.propTypes = {
    ingredient: INGREDIENT.isRequired
}

export default IngredientDetails;