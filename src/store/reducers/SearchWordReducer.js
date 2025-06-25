const initialState = {
    Searchword: ""
}
const SearchWordReducer = (state = initialState, action) => {

    if (action.type === "SET_WORD") {
        let word = action.payload;
        return {
            ...state,
            Searchword: word
        }
    }

    return state;
}
export default SearchWordReducer;

