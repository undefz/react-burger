import PropTypes from "prop-types";
import {INGREDIENT_TYPES} from "./app-config";

export const INGREDIENT_TYPE = PropTypes.oneOf(INGREDIENT_TYPES);

export const INGREDIENT = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: INGREDIENT_TYPE.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
});

export const INGREDIENTS_ARRAY = PropTypes.arrayOf(INGREDIENT);

export const CHILDREN = PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
]);