import { getProducts } from "../../services/products";

const initialState = await getProducts();
export const productsReducer = (state = initialState, action) => {

    switch (action.type) {
        case "@products/getAllProducts":

            return action.payload;

        default:
            return state;
    }
}