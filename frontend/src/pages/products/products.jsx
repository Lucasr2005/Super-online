import { useEffect, useState } from "react";
import { getProducts } from "../../services/products.js";
import { displayProducts } from "./functions/display.products.jsx";

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts().then((response) => setProducts(response));
    }, []);

    return (
        <>
            <section className="max-w-screen my-10">
                <div className="grid grid-cols-2 mx-3 gap-y-5 gap-x-3">
                    {displayProducts(products)}
                </div>
            </section>
        </>
    );
}

export default Products;
