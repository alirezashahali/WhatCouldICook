export const init = (db) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS ingredients(id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL)',
                [], () => {console.log('success on ingredients')},
                (_, err)=> {reject(err)}
            )
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS categories(id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL)',
                [], () => {console.log('success on categories')},
                (_, err)=> {reject(err)}
            )
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS recipes(id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, recipe TEXT NOT NULL, estimatedTime INTEGER NOT NULL, imageUrl TEXT)',
                [], () => {console.log('success on recipes')},
                (_, err)=> {reject(err)}
            )
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS relations(recipe_id INTEGER NOT NULL, category_id INTEGER NOT NULL, ingredient_id INTEGER NOT NULL, FOREIGN KEY(recipe_id) REFERENCES recipes(id), FOREIGN KEY(category_id) REFERENCES categories(id), FOREIGN KEY(ingredient_id) REFERENCES ingredients(id))',
                [], () => {console.log('success on relations')},
                (_, err)=> {reject(err)}
            )
            },
            (err) => reject(err),
            () => resolve()
        )
    })
    return promise
}

export const addIngredientSql = (db, name) => {
    let id
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT id FROM ingredients WHERE name = ${name}`,
                [], (_, result) => {id = result},
                (_, err)=> {reject(err)}
            )
            if(!id){
                tx.executeSql(
                    `INSERT INTO ingredients (name) VALUES (?)`,
                    [name], (_, result) => {id = result.insertId},
                    (_, err)=> {reject(err)}
                )
            }
        },
            (err) => reject(err),
            () => resolve(id)
        )
    })
}

export const addCategorySql = (db, name) => {
    let id
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT id FROM categories WHERE name = ${name}`,
                [], (_, result) => {id = result},
                (_, err)=> {reject(err)}
            )
            if(!id){
                tx.executeSql(
                    `INSERT INTO categories (name) VALUES (?)`,
                    [name], (_, result) => {id = result.insertId},
                    (_, err)=> {reject(err)}
                )
            }
        },
            (err) => reject(err),
            () => resolve(id)
        )
    })
}

export const findIngredientSql = (db, name) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT id FROM ingredients WHERE name = ${name}`,
                [], (_, result) => {resolve(result)},
                (_, err)=> {reject(err)}
            )}
        )
    })
}

export const findCategorySql = (db, name) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT id FROM categories WHERE name = ${name}`,
                [], (_, result) => {resolve(result)},
                (_, err)=> {reject(err)}
            )}
        )
    })
}

export const AddRecipeSql = (db, name, recipe, estimatedTime, imageUrl) => {
    let id
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT id FROM recipes WHERE name = ${name}`,
                [], (_, result) => {
                    id = result
                },
                (_, err)=> {reject(err)}
            )}
        )
        if(id){
            reject('a recipe with the same name exist please try with a different name for your recipe')
        }else{
            tx.executeSql(
                `INSERT INTO recipes (name, recipe, estimatedTime, imageUrl) VALUES (?, ?, ?, ?)`,
                [name, recipe, estimatedTime, imageUrl],
                (_, result) => {
                    console.log('new recipe created', result)
                    resolve(result.insertId)
                },
                (_, err) => {reject(err)}
            )
        }
    })
}


// const promise = new Promise((resolve, reject) => {
//     db.transaction(tx => {
//         tx.executeSql(
//             'CREATE TABLE IF NOT EXISTS ingredients(id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL)',
//             [], () => {console.log('success on ingredients')},
//             (_, err)=> {reject(err)}
//         )},
//         (err) => reject(err),
//         () => resolve()
//     )
// })