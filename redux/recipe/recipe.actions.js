import recipeTypes from './recipe.types'

export const addRecipe = (recipe)=>({
    type: recipeTypes.ADD_RECIPE, payload: recipe
})

export const removeRecipe = (id) => ({
    type: recipeTypes.REMOVE_RECIPE, payload: id
})