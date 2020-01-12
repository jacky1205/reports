import { FETCH_STUDENTS_DETAILS, SORT_BY_APLHABETICAL, SORT_BY_MARKS, FILTER_BY_NAME, AUTHENTICATION } from '../types';
import Cookies from 'js-cookies';


const initialState = {
    studentsDetails: {},
    orderAlphabetical: '',
    marksOrder: '',
    queryName: '',
    isAuthLoggedIn: Cookies.getItem('user'),
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_STUDENTS_DETAILS:
            return {
                ...state,
                studentsDetails: action.payload
            }
        case SORT_BY_APLHABETICAL:
            return {
                ...state,
                orderAlphabetical: action.payload
            }
        case SORT_BY_MARKS:
            return {
                ...state,
                marksOrder: action.payload

            }
        case FILTER_BY_NAME:
            return {
                ...state,
                queryName: action.payload
            }
        case AUTHENTICATION:
            return {
                ...state,
                isAuthLoggedIn: Cookies.getItem('user')
            }

        default:
            return {
                ...state
            }
    }
}

