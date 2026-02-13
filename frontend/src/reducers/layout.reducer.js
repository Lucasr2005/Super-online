const initialState = {
    displaySideBar: false
};
export const layoutReducer = (state = initialState, action) => {

    switch (action.type) {
        case "@layout/setSidebar":
            return { ...state, displaySideBar: !state.displaySideBar };
        default:
            return state;
    }
}