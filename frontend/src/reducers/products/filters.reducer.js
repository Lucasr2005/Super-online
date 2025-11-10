const ALL = "ALL"
const initialState = {
    category: ALL,
    subCategory: ALL,
    brand: ALL,
    minPrice: 0,
    maxPrice: 999999
}
export const filtersReducer = (state = initialState, action) => {

    switch (action.type) {
        case "@filters/setCategory":
            return { ...state, category: action.payload }
        case "@filters/setSubCategory":
            return { ...state, subCategory: action.payload }
        case "@filters/setBrand":
            return { ...state, brand: action.payload }
        case "@filters/setMinPrice":
            return { ...state, minPrice: action.payload }
        case "@filters/setMaxPrice":
            return { ...state, maxPrice: action.payload }
        default:
            return state;
    }
}