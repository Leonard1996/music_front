const parseLocalStorageKey = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key))
    } catch (error){
        console.log({error})
    }
    return null
}

export default parseLocalStorageKey