const initialState = {
    isLoading: false,
    data: {}
}

export const example = (state = initialState, action) => {
    switch (action.type) {
        case 'DATA_IS_LOADING':
            return {
                ...state,
                isLoading: true
            }
        case 'DATA_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                data: action.data
            }
        default:
            return state
    }
}