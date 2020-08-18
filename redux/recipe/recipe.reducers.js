import recipeTypes from './recipe.types'
import {initial_recipes} from './../../data/dummyRecipe'

const INITIAL_STATE = {
    recipes:initial_recipes
}

const RecipeReducer = (state=INITIAL_STATE, actions) => {
    switch(actions.type){
        case recipeTypes.ADD_RECIPE:
            if(state.recipes.findIndex(el => el.name===actions.payload.name)<=-1){
                const id = Math.floor(Math.random()*100000)
                return {...state, recipes:[...state.recipes, {...actions.payload, id}]}
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