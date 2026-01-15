const getInitialState = () => {
    try {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
        console.error("Could not get cart from localStorage", e);
        return [];
    }
};

const initialState = getInitialState();

const updateStateAndStorage = (newState) => {
    try {
        localStorage.setItem("cart", JSON.stringify(newState));
    } catch (e) {
        console.error("Could not save cart to localStorage", e);
    }
    return newState;
};

export const cartReducer = (state = initialState, action) => {

    switch (action.type) {
        case "@cart/addProduct": {
            const productInCart = state.find((p) => p.id === action.payload.id);
            if (productInCart) {
                const newState = state.map((p) =>
                    p.id === action.payload.id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                );
                return updateStateAndStorage(newState);
            } else {
                const newState = [...state, { ...action.payload, quantity: 1 }];
                return updateStateAndStorage(newState);
            }
        }
        case "@cart/decreaseQuantity": {
            const productInCart = state.find((p) => p.id === action.payload.id);

            if (!productInCart) {
                return state;
            }

            if (productInCart.quantity === 1) {
                const newState = state.filter((p) => p.id !== action.payload.id);
                return updateStateAndStorage(newState);
            }

            const newState = state.map((p) =>
                p.id === action.payload.id
                    ? { ...p, quantity: p.quantity - 1 }
                    : p
            );
            return updateStateAndStorage(newState);
        }
        case "@cart/removeProduct": {
            const newState = state.filter((p) => p.id !== action.payload.id);
            return updateStateAndStorage(newState);
        }
        default:
            return state;
    }
}
