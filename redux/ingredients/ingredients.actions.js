import IngredientTypes from './ingredients.types'

export const addIngredient = ingred => ({
    type: IngredientTypes.ADD_INGRIEDIENT_ALL, payload: ingred
})

export const removeIngredient = ingred => ({
    type: IngredientTypes.REMOVE_INGREDIENT_ALL, payload: ingred
})

export const addIngredientAvailable = ingred => ({
    type: IngredientTypes.ADD_INGRIEDIENT, payload: ingred
})

export const removeIngredientAvailable = ingred => ({
    type: IngredientTypes.REMOVE_INGREDIENT, payload: ingred
})