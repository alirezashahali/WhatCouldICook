export const initialState = {
    name: "",
    recipe: "",
    imageUrl: "",
    ingredients: [],
    categories: [],
    estimatedTime: null,
    nameError: "",
    ingredientsError: "",
    categoriesError: "",
    savingClicked: false
}

export function reducer(state, action){
    switch(action.type){
        case "copy":
            return {...state, recipeModel: {...state, recipeModel: null}}
        case "addIngredient":
            if(state.ingredients.includes(action.payload)){
                return state
            }else{
                return {...state, ingredients: [action.payload, ...state.ingredients]}
            }
        case "removeIngredient":
            const ingredients = state.ingredients.filter(el => el!==action.payload)
            return {...state, ingredients}

        case "addCategory":
            if(state.categories.includes(action.payload)){
                return state
            }else{
                return {...state, categories: [action.payload, ...state.categories]}
            }
        
        case "removeCategory":
            const categories = state.categories.filter(el => el!==action.payload)
            return {...state, categories}
        
        case "changeName":
            return {...state, name: action.payload, nameError: ""}

        case "changeImageUrl":
            return {...state, imageUrl: action.payload}

        case "changeEstimatedTime":
            return {...state, estimatedTime: action.payload}

        case "changeSavingClicked":
            return {...state, savingClicked: true}
        
        case "reset":
            return initialState

        
        case "errorOccurance":
            let copyState = {...state}
            if(state.savingClicked){
                if(action.payload[0]>0){
                    copyState = {...copyState, ingredientsError: "ingredients must at list include one item"}
                }else{
                    copyState = {...copyState, ingredientsError: ""}
                }
                if(action.payload[1]>0){
                    copyState = {...copyState, categoriesError: "categories must at list include one item"}
                }else{
                    copyState = {...copyState, categoriesError: ""}
                }
                if(action.payload[2]>0){
                    copyState = {
                        ...copyState, nameError: "each recipe needs a name"
                    }
                }else{
                    copyState = {
                        ...copyState, nameError: ""
                    }
                }
            }
            return copyState

        default:
            return state
    }
}

export const onPress = () => () => {
    for(i in state.ingredients){

    }
}

export const errorChecker = (state) => {
    if(state.ingredients.length===0 || state.categories.length===0 || state.name===""){
        let errors = [0, 0, 0]
        if(state.ingredients.length===0){
            errors[0] = 1
        }
        if(state.categories.length===0){
            errors[1] = 1
        }
        if(state.name===""){
            errors[2] = 1
        }
    return errors
    }
    return [0, 0, 0]
}