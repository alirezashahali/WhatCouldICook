import IngredientTypes from './ingredients.types'

export const addIngredient = ingred => ({
    type: IngredientTypes.ADD_INGRIEDIENT, payload: ingred
})

export const removeIngredient = ingred => ({
    type: IngredientTypes.REMOVE_INGREDIENT, payload: ingred
})