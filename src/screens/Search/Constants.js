export const reducer = (state, action) => {
    switch(action.type){
        case "starGiver":
            const chosenCats = action.payload.chosenCats.map(el => el.name.toLowerCase())
            const ingredients = action.payload.availableIngredients.map(el => el.name.toLowerCase())
            const copyState = [...state]
            for(i in copyState){
                let catsStar = 0
                let ingsStar = 0
                let additionalIngs = 0
                if(chosenCats.length> 0){
                    for(j in copyState[i].categories){
                        if(chosenCats.includes(copyState[i].categories[j].name.toLowerCase())){
                            catsStar += 1
                        }
                    }
                }
                if(ingredients.length>0){
                    for(k in copyState[i].ingredients){
                        if(ingredients.includes(copyState[i].ingredients[k].name.toLowerCase())){
                            ingsStar += 1
                        }
                    }
                    additionalIngs = copyState[i].ingredients.length - ingsStar
                }
                copyState[i] = {...copyState[i], catsStar, ingsStar, additionalIngs}
            }
            return copyState
        case "reset":
            return action.payload
        case "sort":
            const sortState = [...state]
            sortState.sort((a, b) => {
                if(a.additionalIngs !== b.additionalIngs){
                    return a.additionalIngs - b.additionalIngs
                }else{
                    return b.catsStar - a.catsStar
                }
            })
            return sortState
        default:
            return state
    }
}