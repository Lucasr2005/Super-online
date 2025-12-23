
export const cartReducer = (state = [], action) => {

    switch (action.type) {
        case "@cart/addProduct":
            let product = state.find((p) => p.id === action.payload.id);
            if (product) {
                product.quantity += 1;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
            return state;
        case "@cart/decreaseQuantity":
            product = state.find((p) => p.id === action.payload.id);
            if (product) {
                product.quantity -= 1;
                if (product.quantity === 0) {
                    return state.filter((p) => p.id !== action.payload.id);
                }
            }
            return state;
        case "@cart/removeProduct":
            return state.filter((p) => p.id !== action.payload.id);
        default:
            return state;
    }
}

