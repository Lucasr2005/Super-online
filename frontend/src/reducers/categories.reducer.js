import { getCategories } from "../services/categories.js";

const initialState = await getCategories();

export const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "@categories/setCategories":
            return action.payload;
        default:
            return state;
    }
}