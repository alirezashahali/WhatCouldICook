import Recipe from './../models/recipe'
export const initial_recipes = [
    new Recipe(1, "scrambled egg", [{id: 1, name: "general"}], [{id: 1, name: "Egg"}, {id: 2, name: "oil"}],
    "first you heat the oil and then break the egg in it. after 10 minutes its ready to be enjoyed", 20),
    new Recipe(2, "pancake", [{id: 1, name: "general"}, {id: 2, name: "breakfast"}],
    [{id: 1, name: "Egg"}, {id: 2, name: "oil"}, {id: 3, name: "flour"}],
    "first you heat the oil and then you add the mixure", 20)
]

export const initial_categories = [
    {id: 1, name: "general"}, {id: 2, name: "breakfast"}, {id: 3, name: "persian"},
    
]
