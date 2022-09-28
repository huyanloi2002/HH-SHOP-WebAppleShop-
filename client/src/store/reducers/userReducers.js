import actionTypes from '../actions/actionTypes';

export const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
        case actionTypes.REGISTER_USER_REQUEST:
        case actionTypes.LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case actionTypes.LOGIN_SUCCESS:
        case actionTypes.REGISTER_USER_SUCCESS:
        case actionTypes.LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case actionTypes.LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }
        case actionTypes.LOGOUT_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case actionTypes.LOGIN_FAIL:
        case actionTypes.REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case actionTypes.LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}
//user
export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_PROFILE_REQUEST:
        case actionTypes.UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.UPDATE_PROFILE_SUCCESS:
        case actionTypes.UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case actionTypes.UPDATE_PROFILE_FAIL:
        case actionTypes.UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case actionTypes.UPDATE_PROFILE_RESET:
        case actionTypes.UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}
//forgot password
export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.FORGOT_PASSWORD_REQUEST:
        case actionTypes.NEW_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case actionTypes.FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        case actionTypes.NEW_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload
            }
        case actionTypes.FORGOT_PASSWORD_FAIL:
        case actionTypes.NEW_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}
// all USERS
export const usersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case actionTypes.ALL_USERS_REQUEST:
            return {
                loading: true,
                users: []
            }
        case actionTypes.ALL_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload.users,
                countUsers: action.payload.count

            }
        case actionTypes.ALL_USERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}
// user admin
export const userAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.DELETE_USER_REQUEST:
        case actionTypes.UPDATE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case actionTypes.UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case actionTypes.DELETE_USER_FAIL:
        case actionTypes.UPDATE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case actionTypes.DELETE_USER_RESET:
            return {
                loading: false,
                isDeleted: false
            }
        case actionTypes.UPDATE_USER_RESET:
            return {
                loading: false,
                isUpdated: false
            }
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}
// get user details admin
export const userDetailsReducer = (state = { userDetails: {} }, action) => {
    switch (action.type) {
        case actionTypes.GET_USER_DETAILS_REQUEST:
            return {
                loading: true,
            }
        case actionTypes.GET_USER_DETAILS_SUCCESS:
            return {
                loading: false,
                userDetails: action.payload.user
            }
        case actionTypes.GET_USER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}