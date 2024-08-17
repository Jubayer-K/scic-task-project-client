import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../Shared/Card";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data using Axios
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products`
        );
        setProducts(response.data);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1 className="text-center font-nunito font-medium text-5xl">All Products</h1>
      <div className=" my-5 md:w-1/3 mx-auto">
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="grid lg:grid-cols-4 gap-5 md:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} product={product}></Card>
        ))}
      </div>
      <h2 className="my-4 text-center">Total Products: {products.length}</h2>
      <div className="flex justify-center my-5">
        <div className="join">
          <button className="join-item btn">Previous</button>
          <button className="join-item btn btn-active">1</button>
          <button className="join-item btn">2</button>
          <button className="join-item btn">3</button>
          <button className="join-item btn">4</button>
          <button className="join-item btn">5</button>
          <button className="join-item btn">Next</button>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
