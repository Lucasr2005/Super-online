const initialState = {
    isLogged: false,
    isValidated: false,
};
export const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case "@user/setUser":
            return {
                ...state,
                isLogged: true,
                isValidated: true,
            };
        case "@user/setInvalid":
            return {
                ...state,
                isLogged: false,
                isValidated: true,
            };
        case "@user/logoutUser":
            return {
                ...state,
                isLogged: false,
                isValidated: true,
            };
        default:
            return state;
    }
}