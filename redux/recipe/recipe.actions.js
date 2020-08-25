import recipeTypes from './recipe.types'
import * as SQLite from 'expo-sqlite';
import {AddRecipeSql} from './../../src/helpers/db'

const db = SQLite.openDatabase('recipe.db')

export const addRecipe = (recipe)=>{
    let id
    return async (dispatch) => {
        try{
            id = await AddRecipeSql(db, recipe.name, recipe.recipe, recipe.estimatedTime, recipe.imageUrl)
        }catch(e){
            console.log(e)
        }
        return dispatch({
            type: recipeTypes.ADD_RECIPE, payload: {id, ...recipe}
        })
    }
    // type: recipeTypes.ADD_RECIPE, payload: recipe
}

export const removeRecipe = (id) => ({
    type: recipeTypes.REMOVE_RECIPE, payload: id
})