import categoriesTypes from './categories.types'

export const addChosenCats = (name) => ({
    type: categoriesTypes.ADD_CAT, payload: name
})

export const removeChosenCats = (id) => ({
    type: categoriesTypes.REMOVE_CAT, payload: id
})

export const addAllCats = (name) => ({
    type: categoriesTypes.ADD_ALL_CAT, payload: name
})

export const removeFromAllCats = (id) => ({
    type: categoriesTypes.REMOVE_FROM_ALL_CAT, payload: id
})