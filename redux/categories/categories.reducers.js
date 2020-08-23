import categorieTypes from './categories.types'
import {initial_categories} from './../../data/dummyRecipe'

INITIAL_STATE = {
    allCats: initial_categories,
    chosenCats: []
}

const CatReducer = (state=INITIAL_STATE, actions) => {
    switch(actions.type){
        case categorieTypes.ADD_CAT:
            if(!state.chosenCats.find(el => el.name===actions.payload)){
                const id = Math.floor(Math.random()*100000)
                return {...state, chosenCats: [...state.chosenCats, {name: actions.payload, id}]}
            }else{
                return state
            }

        case categorieTypes.REMOVE_CAT:
            const chosenCats = state.chosenCats.filter(el => el.id!==actions.payload)
            return {...state, chosenCats}

        case categorieTypes.ADD_ALL_CAT:
            if(!state.allCats.find(el => el.name === actions.payload)){
                const id = Math.floor(Math.random()*100000)
                console.log("TYPEOF", typeof actions.payload)
                return {...state, allCats: [...state.allCats, {name: actions.payload, id}]}
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