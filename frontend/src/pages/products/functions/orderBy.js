export const orderBy = (products, orderBy) => {
    switch (orderBy) {
        case "priceAsc":
            return [...products].sort((a, b) => a.price - b.price);
        case "priceDesc":
            return [...products].sort((a, b) => b.price - a.price);
        case "nameAsc":
            return [...products].sort((a, b) => a.name.localeCompare(b.name));
        case "nameDesc":
            return [...products].sort((a, b) => b.name.localeCompare(a.name));
        default:
            return products;
    }
}