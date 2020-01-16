import { FETCH_STUDENTS_DETAILS, SORT_BY_APLHABETICAL, SORT_BY_MARKS, FILTER_BY_NAME, AUTHENTICATION, SELECT_ONCHANGE, SELECT_DEFAULT_OPTIONS } from '../types';

export const fetchStudentDetails = (dispatch) => {
    return fetch('https://api.myjson.com/bins/1dlper').then(res => res.json()).then(data => {
        dispatch({ type: FETCH_STUDENTS_DETAILS, payload: data })
        return data;
    })
}

export const sortByAlphabeticalAction = (dispatch, order) => {
    dispatch({
        type: SORT_BY_APLHABETICAL, payload: order
    })
}

export const sortByMarksAction = (dispatch, order) => {
    dispatch({
        type: SORT_BY_MARKS, payload: order
    })
}

export const filterByNameAction = (dispatch, queryName) => {
    dispatch({
        type: FILTER_BY_NAME, payload: queryName
    })
}

export const authenticationAction = (dispatch) => {
    dispatch({
        type: AUTHENTICATION
    })
}

export const selectOnChangeAction = (dispatch, queryOnChange) => {
    const mockData = [{ title: 'abc', disable: false }, { title: 'abcd', disable: true }, { title: 'bc' }, { title: 'ab' }];
    const filteredOptions = mockData.filter((option) => queryOnChange && option.title.toUpperCase().startsWith(queryOnChange.toUpperCase()));
    dispatch({
        type: SELECT_ONCHANGE, payload: filteredOptions
    })
}

export const selectDefaultAction = (dispatch) => {
    const mockData = [{ title: 'abc', disable: false }, { title: 'abcd', disable: true }, { title: 'bc' }]
    dispatch({
        type: SELECT_DEFAULT_OPTIONS, payload: mockData
    })
}


