import recipeTypes from './recipe.types'
import {initial_recipes} from './../../data/dummyRecipe'
import Recipe from './../../models/recipe'

const INITIAL_STATE = {
    recipes:initial_recipes
}

const RecipeReducer = (state=INITIAL_STATE, actions) => {
    switch(actions.type){
        case recipeTypes.ADD_RECIPE:
            if(state.recipes.findIndex(el => el.name===actions.payload.name)<=-1){
                const pay = actions.payload
                const recipe = new Recipe(pay.id, pay.name, pay.categories,
                    pay.ingredients, pay.recipe, pay.estimatedTime, pay.imageUrl)
                return {...state, recipes:[...state.recipes, recipe]}
            }else{
                return state
            }
        
        case recipeTypes.REMOVE_RECIPE:
            const recipes = state.recipes.filter(el => el.id!==actions.payload)
            return {...state, recipes}
        default:
            return state
    }
}

export default RecipeReducer