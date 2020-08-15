import categorieTypes from './categories.types'

INITIAL_STATE = {
    allCats: [],
    chosenCats: []
}

const CatReducer = (state=INITIAL_STATE, actions) => {
    switch(actions.type){
        case categorieTypes.ADD_CAT:
            
            if(state.chosenCats.findIndex(el => el.name===actions.payload)> -1){
                const id = Math.floor(Math.random()*100000)
                return {...state, chosenCats: [...state.chosenCats, {...actions.payload, id}]}
            }else{
                return state
            }

        case categorieTypes.REMOVE_CAT:
            const chosenCats = state.chosenCats.filter(el => el.id===actions.payload)
            return {...state, chosenCats}

        case categorieTypes.ADD_ALL_CAT:
            if(state.allCats.findIndex(el => el.name===actions.payload)> -1){
                const id = Math.floor(Math.random()*100000)
                return {...state, allCats: [...state.allCats, {...actions.payload, id}]}
            }else{
                return state
            }

        case categorieTypes.REMOVE_FROM_ALL_CAT:
            const allCats = state.allCats.filter(el => el.id===actions.payload)
            return {...state, allCats}
        
        default:
            return state
    }
}

export default CatReducer