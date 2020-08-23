import IngredientType from './ingredients.types'

const INITIAL_STATE = {
    availableIngredient: [],
    allIngredients: []
}

const ingredientReducer = (state=INITIAL_STATE, actions) => {
    switch(actions.type){
        case IngredientType.ADD_INGRIEDIENT_ALL:
            if(!state.allIngredients.find(el => el.name === actions.payload)){
                const id = Math.floor(Math.random()*100000)
                return {...state, allIngredients:[...state.allIngredients,
                    {name: actions.payload, id}]}
            }else{
                return state
            }

        case IngredientType.REMOVE_INGREDIENT_ALL:
            let all = [...state.allIngredients]
            all = all.filter(el => el.id !== actions.payload)
            return {...state, allIngredients: all }

        case IngredientType.ADD_INGRIEDIENT:
            if(!state.availableIngredient.find(el => el.name === actions.payload)){
                const id = Math.floor(Math.random()*100000)
                return {...state, availableIngredient:[...state.availableIngredient,
                    {name: actions.payload, id}]}
            }else{
                return state
            }

        case IngredientType.REMOVE_INGREDIENT:
            let available = [...state.availableIngredient]
            available = available.filter(el => el.id !== actions.payload)
            return {...state, availableIngredient: available }
        default:
            return state
    }
}

export default ingredientReducer