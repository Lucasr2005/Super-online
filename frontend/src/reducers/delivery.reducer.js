const INITIAL_STATE = {
    address: {},
    shippingPrice: 0,
    isAddressSet: false,
}

export const deliveryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "@delivery/setAddress":
            return { ...state, address: action.payload, isAddressSet: true }
        case "@delivery/setShippingPrice":
            return { ...state, shippingPrice: action.payload }
        default:
            return state
    }
}