const ALL = "ALL"
const initialState = {
    category: ALL,
    subCategory: ALL,
    brand: ALL,
    display: false
}
export const filtersReducer = (state = initialState, action) => {

    switch (action.type) {
        case "@filters/setCategory":
            return { ...state, category: action.payload }
        case "@filters/setSubCategory":
            return { ...state, subCategory: action.payload }
        case "@filters/setBrand":
            return { ...state, brand: action.payload }
        case "@filters/setDisplay":
            return { ...state, display: action.payload }
        default:
            return state;
    }
}