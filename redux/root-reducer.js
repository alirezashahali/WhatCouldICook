import {combineReducers} from 'redux'
import ingredientsReducer from './ingredients/ingredients.reducers'
import recipesReducer from './recipe/recipe.reducers'
import categoriesReducer from './categories/categories.reducers'

export default rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    recipe: recipesReducer,
    categories: categoriesReducer
})