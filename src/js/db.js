import { openDB } from 'idb'

const dbName = 'pocket-synth-pwa-db'
const dbVersion = 1
const storeName = 'presets'

const initDB = () => {
    openDB(dbName, dbVersion, {
        upgrade(db) {
            // create store of objects
            db.createObjectStore(storeName, {
                keyPath: 'id',
                autoIncrement: true,
            })
        }
    })
}

// create
export const addPreset = async preset => {
    const db = await openDB(dbName, dbVersion)
    await db.add(storeName, preset)
}

// read
export const getAllPresets = async () => {
    const db = await openDB(dbName, dbVersion)
    const transaction = db.transaction(storeName, 'readonly')
    const store = transaction.store
    return await store.getAll()
}

export const getPreset = async id => {
    const db = await openDB(dbName, dbVersion)
    const transaction = db.transaction(storeName, 'readonly')
    const store = transaction.store
    return await store.get(id)
}

// update
export const updatePreset = async preset => {
    const db = await openDB(dbName, dbVersion)
    const transaction = db.transaction(storeName, 'readwrite')
    const store = transaction.store
    return await store.put(preset)
}

// delete
export const deletePreset = async id => {
    const db = await openDB(dbName, dbVersion)
    const transaction = db.transaction(storeName, 'readwrite')
    const store = transaction.store
    return await store.delete(id)
}


initDB()
// console.log(await getPreset(2))
// // addPreset({ harmonicity: 1, modulationType: 'square'})\\
// await updatePreset()
// await deletePreset