import IngredientType from './ingredients.types'


const INITIAL_STATE = {
    availableIngredient: []
}

const ingredientReducer = (state=INITIAL_STATE, actions) => {
    switch(actions.type){
        case IngredientType.ADD_INGRIEDIENT:
            if(!state.availableIngredient.includes(actions.payload)){
                return {...state, availableIngredient:[...state.availableIngredient, actions.payload]}
            }else{
                return state
            }

        case IngredientType.REMOVE_INGREDIENT:
            let available = [...state.availableIngredient]
            available = available.filter(el => el!==actions.payload)
            return {...state, availableIngredient: available }
        default:
            return state
    }
}

export default ingredientReducer