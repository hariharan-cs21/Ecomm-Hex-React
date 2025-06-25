

export const setSearchWord = (dispatch) => (word) => {

    dispatch({
        payload: word,
        type: 'SET_WORD'
    })
}