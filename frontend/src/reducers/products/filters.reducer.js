const initialState = {
    category: "ALL",
    subCategory: [],
    brand: [],
    display: false
}

const checkIfExistsAndAdd = (array, item) => {
    const alreadyExists = array.includes(item);
    return alreadyExists
        ? array.filter(element => element !== item)
        : [...array, item];
}

export const filtersReducer = (state = initialState, action) => {

    switch (action.type) {
        case "@filters/setCategory": {
            return { ...state, category: action.payload };
        }

        case "@filters/setSubCategory": {
            const newSubCategory = checkIfExistsAndAdd(state.subCategory, action.payload);

            return { ...state, subCategory: newSubCategory };
        }

        case "@filters/setBrand": {
            const newBrand = checkIfExistsAndAdd(state.brand, action.payload);

            return { ...state, brand: newBrand };
        }

        case "@filters/setDisplay":
            return { ...state, display: action.payload };

        default:
            return state;
    }
}