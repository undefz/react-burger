import styles from "./ingredient-details.module.css"
import {useParams} from "react-router";
import {useAppSelector} from "../../services/hooks";

const IngredientDetails = () => {
    const {id} = useParams();
    const ingredient = useAppSelector(state => state.ingredients.items).find(x => x._id === id);

    if (!ingredient) {
        return <></>;
    }

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

type TIngredientFieldProps = {
    name: string;
    value: number;
}

const IngredientField = ({name, value}: TIngredientFieldProps) => {
    return (
        <div className={styles.ingredientField}>
            <p className={styles.ingredientFieldDescription}>{name}</p>
            <p className={styles.ingredientFieldNumber}>{value}</p>
        </div>
    );
}

export default IngredientDetails;