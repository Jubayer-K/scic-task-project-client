import { useLoaderData } from "react-router-dom";

const AllProducts = () => {
    const products = useLoaderData();
    return (
        <>
        <h1>All product show here</h1>
        <h2> total products : {products.length}</h2>
        </>
    );
};

export default AllProducts;