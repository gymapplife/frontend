export const dataIsLoading = () => {
    return {
        type: 'DATA_IS_LOADING'
    }
}

export const dataFetchSuccess = (data) => {
    return {
        type: 'DATA_FETCH_SUCCESS',
        data
    }
}

export function fetchData() {
    return (dispatch) => {
        dispatch(dataIsLoading(true));

        fetch("http://mockbin.org/bin/c0a17ea5-6896-41c1-b8b8-2a53c3d0b0c3")
            .then((res) => {
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                return res;
            })
            .then((res) => res.json())
            .then((data) => dispatch(dataFetchSuccess(data)))
    }
}
