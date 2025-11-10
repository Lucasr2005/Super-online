
export function fetchProducts(products) {
    return {
        type: "@products/getAllProducts",
        payload: products,
    }
}